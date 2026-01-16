import { ComponentExample } from "@/components/ui/example/component-example";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

export default function Page() {
  return (
    <div className="container mx-auto space-y-8 p-8">
      <div className="space-y-4">
        <h2 className="font-bold text-2xl">Resizable Panels - Horizontal</h2>
        <div className="h-64 rounded-lg border">
          <ResizablePanelGroup orientation="horizontal">
            <ResizablePanel defaultSize={25} minSize={15}>
              <div className="flex h-full items-center justify-center bg-muted p-4">
                <p className="text-sm">Left Panel (25%)</p>
              </div>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={50} minSize={30}>
              <div className="flex h-full items-center justify-center bg-background p-4">
                <p className="text-sm">Center Panel (50%)</p>
              </div>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={25} minSize={15}>
              <div className="flex h-full items-center justify-center bg-muted p-4">
                <p className="text-sm">Right Panel (25%)</p>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="font-bold text-2xl">Resizable Panels - Vertical</h2>
        <div className="h-64 rounded-lg border">
          <ResizablePanelGroup orientation="vertical">
            <ResizablePanel defaultSize={25} minSize={15}>
              <div className="flex h-full items-center justify-center bg-muted p-4">
                <p className="text-sm">Top Panel (25%)</p>
              </div>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={50} minSize={30}>
              <div className="flex h-full items-center justify-center bg-background p-4">
                <p className="text-sm">Middle Panel (50%)</p>
              </div>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={25} minSize={15}>
              <div className="flex h-full items-center justify-center bg-muted p-4">
                <p className="text-sm">Bottom Panel (25%)</p>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </div>

      <ComponentExample />
    </div>
  );
}
