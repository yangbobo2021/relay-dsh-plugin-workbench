import type { ComponentType } from 'react'

export const WORKBENCH_API_VERSION: 1

export type WorkbenchRegion = 'side' | 'bottom'
export interface WorkbenchIconProps { className?: string }
export interface WorkbenchViewDescriptor {
  id: string
  region: WorkbenchRegion
  title: string
  order?: number
  icon?: ComponentType<WorkbenchIconProps>
}
export interface WorkbenchPanelOwnerProps { closePanel(): void }

declare module '@deepseek-ai/dsh-client-ui-slots' {
  interface SlotMap {
    'workbench.side.view': { kind: 'keyed'; scope: 'root'; owner: WorkbenchPanelOwnerProps }
    'workbench.bottom.view': { kind: 'keyed'; scope: 'root'; owner: WorkbenchPanelOwnerProps }
  }
}

export interface WorkbenchSnapshot { readonly views: readonly WorkbenchViewDescriptor[] }
export interface IWorkbench {
  readonly apiVersion: typeof WORKBENCH_API_VERSION
  registerView(descriptor: WorkbenchViewDescriptor): () => void
  getSnapshot(): WorkbenchSnapshot
  subscribe(listener: () => void): () => void
  openView(region: WorkbenchRegion, viewId: string): void
  toggleRegion(region: WorkbenchRegion): void
  closeRegion(region: WorkbenchRegion): void
}
