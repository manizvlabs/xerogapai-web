import {isValidSignature, SIGNATURE_HEADER_NAME} from '@sanity/webhook'
import {revalidatePath} from 'next/cache'
import {NextResponse} from 'next/server'

type WebhookPayload = {
  _type?: string
}

const BLOG_DOCUMENT_TYPES = new Set(['blogPost', 'author', 'category'])

export async function POST(request: Request) {
  const secret = process.env.SANITY_WEBHOOK_SECRET

  if (!secret) {
    return NextResponse.json(
      {message: 'SANITY_WEBHOOK_SECRET is not configured'},
      {status: 500},
    )
  }

  const signature = request.headers.get(SIGNATURE_HEADER_NAME)
  const body = await request.text()

  if (!signature || !(await isValidSignature(body, signature, secret))) {
    return NextResponse.json({message: 'Invalid webhook signature'}, {status: 401})
  }

  let payload: WebhookPayload
  try {
    payload = JSON.parse(body) as WebhookPayload
  } catch {
    return NextResponse.json({message: 'Invalid JSON payload'}, {status: 400})
  }

  if (!payload._type || !BLOG_DOCUMENT_TYPES.has(payload._type)) {
    return NextResponse.json({revalidated: false, message: 'Ignored non-blog document'})
  }

  revalidatePath('/blog')
  revalidatePath('/blog/[slug]', 'page')
  revalidatePath('/sitemap.xml')

  return NextResponse.json({revalidated: true, documentType: payload._type})
}
