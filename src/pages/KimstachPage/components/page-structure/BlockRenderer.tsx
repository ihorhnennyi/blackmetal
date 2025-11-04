import { Box } from '@mui/material'
import { TextBlock } from '../text-blocks'
import { ContactsContainer, DocumentContainer } from '../document-sections'
import { DocumentCardProps } from '@/components/DocumentCard/DocumentCardInterface'

interface ContactItem {
  type: string
  value: string
}

interface BlockData {
  title?: string
  link?: string
  date?: string
  value?: string
  type?: string
  data?: DocumentCardProps[] | ContactItem[]
}

interface SpecializedCouncilBlock {
  type: 'text' | 'smalltext' | 'document' | 'documents' | 'contacts'
  content?: string
  data?: BlockData
}

interface BlockRendererProps {
  block: SpecializedCouncilBlock
}

export const BlockRenderer = ({ block }: BlockRendererProps) => {
  switch (block.type) {
    case 'text':
      return block.content ? <TextBlock content={block.content} variant="text" /> : null

    case 'smalltext':
      return block.content ? <TextBlock content={block.content} variant="small" /> : null

    case 'contacts':
      return block.data && Array.isArray(block.data) ? (
        <ContactsContainer contacts={block.data as ContactItem[]} />
      ) : null

    case 'document':
      return block.data ? (
        <DocumentContainer document={block.data} variant="single" />
      ) : null

    case 'documents':
      return block.data && Array.isArray(block.data) ? (
        <DocumentContainer documents={block.data as DocumentCardProps[]} variant="multiple" />
      ) : null

    default:
      return null
  }
} 