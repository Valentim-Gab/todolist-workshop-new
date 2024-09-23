import { Buffer } from 'buffer'

interface base64FileInterface {
  base64Data: string
  fileName?: string
  fileApplicationType: string
}

export function downloadBase64File({
  base64Data,
  fileName = '',
  fileApplicationType,
}: base64FileInterface) {
  const documentBase64 = Buffer.from(base64Data, 'base64')
  const blob = new Blob([documentBase64], { type: fileApplicationType })
  const url = window.URL.createObjectURL(blob)
  const link = document.createElement('a')

  link.href = url
  link.download = fileName
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  window.URL.revokeObjectURL(url)
}

export function openBase64File({
  base64Data,
  fileApplicationType,
}: base64FileInterface) {
  const documentBase64 = Buffer.from(base64Data, 'base64')
  const blob = new Blob([documentBase64], { type: fileApplicationType })
  const url = window.URL.createObjectURL(blob)

  window.open(url)
}
