#!/usr/bin/env node
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { program } from 'commander';
import fs from 'fs-extra';

// Get the directory where this script is located (the starter repo)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const STARTER_DIR = path.resolve(__dirname, '..');

program
  .name('sriket')
  .description('Initialize a new project from the Portfolio Starter template')
  .argument('<project-name>', 'Name of the new project')
  .option('-d, --dir <directory>', 'Destination directory (defaults to current directory)')
  .action(async (projectName, options) => {
    // Load chalk dynamically (ES module)
    const chalk = (await import('chalk')).default;
    try {
      const destDir = options.dir 
        ? path.resolve(options.dir, projectName)
        : path.resolve(process.cwd(), projectName);

      // Check if destination already exists
      if (await fs.pathExists(destDir)) {
        console.error(chalk.red(`Error: Directory ${destDir} already exists`));
        process.exit(1);
      }

      console.log(chalk.blue(`Creating new project: ${projectName}`));
      console.log(chalk.gray(`Destination: ${destDir}`));

      // Create destination directory
      await fs.ensureDir(destDir);

      // Copy all files except .git directory
      console.log(chalk.blue('Copying files...'));
      const filesToCopy = await fs.readdir(STARTER_DIR);
      
      for (const file of filesToCopy) {
        const sourcePath = path.join(STARTER_DIR, file);
        const destPath = path.join(destDir, file);
        
        // Skip .git directory, node_modules, build artifacts, and the bin directory (CLI tool)
        if (file === '.git' || file === 'node_modules' || file === '.next' || file === 'bin') {
          continue;
        }
        
        const stat = await fs.stat(sourcePath);
        if (stat.isDirectory()) {
          await fs.copy(sourcePath, destPath);
        } else {
          await fs.copyFile(sourcePath, destPath);
        }
      }

      // Update package.json with new project name and remove CLI-only dependencies
      const packageJsonPath = path.join(destDir, 'package.json');
      if (await fs.pathExists(packageJsonPath)) {
        const packageJson = await fs.readJson(packageJsonPath);
        packageJson.name = projectName;
        
        // Remove CLI-only dependencies (not needed in new projects)
        const cliDependencies = ['chalk', 'commander', 'fs-extra', 'simple-git', 'inquirer'];
        if (packageJson.dependencies) {
          cliDependencies.forEach(dep => {
            delete packageJson.dependencies[dep];
          });
        }
        
        // Remove bin field (CLI tool is only for the starter repo)
        delete packageJson.bin;
        
        await fs.writeJson(packageJsonPath, packageJson, { spaces: 2 });
      }

      // Initialize git repository
      console.log(chalk.blue('Initializing git repository...'));
      try {
        execSync('git init', { cwd: destDir, stdio: 'inherit' });
        execSync('git add .', { cwd: destDir, stdio: 'inherit' });
        execSync('git commit -m "Initial commit from Portfolio Starter"', { 
          cwd: destDir, 
          stdio: 'inherit' 
        });
      } catch {
        console.warn(chalk.yellow('Warning: Git operations failed. Make sure git is installed.'));
      }

      console.log(chalk.green(`\n✓ Project ${projectName} created successfully!`));
      console.log(chalk.gray('\nNext steps:'));
      console.log(chalk.gray(`  cd ${destDir}`));
      console.log(chalk.gray('  npm install'));
      console.log(chalk.gray('  npm run dev'));
      console.log(chalk.gray('\nTo connect to GitHub:'));
      console.log(chalk.gray('  git remote add origin <your-repo-url>'));
      console.log(chalk.gray('  git push -u origin main'));

    } catch (error) {
      console.error(chalk.red(`Error: ${error.message}`));
      process.exit(1);
    }
  });

program.parse();
