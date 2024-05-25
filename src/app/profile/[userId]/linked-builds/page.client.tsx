'use client'

import {
  BaseTable,
  BaseTableBody,
  BaseTableCell,
  BaseTableHead,
  BaseTableHeader,
  BaseTableRow,
} from '@/app/(components)/_base/table'
import { BaseTextLink } from '@/app/(components)/_base/text'

interface Props {
  linkedBuilds: Array<{
    id: string
    createdById: string
    createdAt: Date
    updatedAt: Date
    label: string
    LinkedBuildItems: Array<{
      id: string
      createdAt: Date
      updatedAt: Date
      linkedBuildId: string
      buildId: string
      label: string
    }>
  }>
}

export function PageClient({ linkedBuilds }: Props) {
  return (
    <>
      <BaseTable>
        <BaseTableHead>
          <BaseTableRow>
            <BaseTableHeader>Name</BaseTableHeader>
            <BaseTableHeader>Variants</BaseTableHeader>
            <BaseTableHeader>Actions</BaseTableHeader>
          </BaseTableRow>
        </BaseTableHead>
        <BaseTableBody>
          {linkedBuilds.map((linkedBuild) => (
            <BaseTableRow key={linkedBuild.id}>
              <BaseTableCell className="font-medium">
                <BaseTextLink href={`/builder/linked/${linkedBuild.id}`}>
                  {linkedBuild.label}
                </BaseTextLink>
              </BaseTableCell>
              <BaseTableCell>
                {linkedBuild.LinkedBuildItems.map((lbi) => lbi.label).join(
                  ', ',
                )}
              </BaseTableCell>
              <BaseTableCell className="text-zinc-500">
                <BaseTextLink href={`/builder/linked/edit/${linkedBuild.id}`}>
                  Edit
                </BaseTextLink>
              </BaseTableCell>
            </BaseTableRow>
          ))}
        </BaseTableBody>
      </BaseTable>
    </>
  )
}
