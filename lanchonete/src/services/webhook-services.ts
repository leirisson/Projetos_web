import { fetchWithTimeout } from './http'
export type WebhookPayload = {
    id: string
    name: string
    email: string
    password: string
}

export type WebhookResult<T = unknown> = {
    ok: boolean
    status: number
    data?: T
    text?: string
}

export async function postWebhookApp(payload: WebhookPayload): Promise<WebhookResult> {
    const url = import.meta.env?.DEV
        ? '/api/webhook'
        : 'https://n8n.foliumdev.com.br/webhook-test/app'
    const res = await fetchWithTimeout(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    })
    const ct = res.headers.get('content-type') || ''
    if (ct.includes('application/json')) {
        const data = await res.json()
        return { ok: res.ok, status: res.status, data }
    }
    const text = await res.text()
    return { ok: res.ok, status: res.status, text }
}

export type LoginPayload = {
    email: string
    password: string
}

export type LoginResponse = {
    row_number: number
    id: string
    name: string
    email: string
    password: string
}

export async function postLoginWeb(payload: LoginPayload): Promise<WebhookResult<LoginResponse>> {
    const url = import.meta.env?.DEV
        ? '/api/webhook/login'
        : 'https://n8n.foliumdev.com.br/webhook/login'
    const res = await fetchWithTimeout(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    })
    const ct = res.headers.get('content-type') || ''
    if (ct.includes('application/json')) {
        const data = await res.json() as LoginResponse
        return { ok: res.ok, status: res.status, data }
    }
    const text = await res.text()
    return { ok: res.ok, status: res.status, text }
}

export type OrderItem = {
    id: string
    title: string
    price: number
    quantity: number
    subtotal: number
}

export type OrderPayload = {
    customerId: string
    customerEmail: string
    customerName: string
    contactPhone: string
    address: string
    referencePoint: string
    paymentMethod: 'cash' | 'credit' | 'debit' | 'pix'
    cashChange?: number
    items: OrderItem[]
    totalItems: number
    totalPrice: number
    createdAt: string
}

export type OrderResponse = {
    orderId?: string
    status?: string
    message?: string
}

export async function postOrderWeb(payload: OrderPayload): Promise<WebhookResult<OrderResponse>> {
    const url = import.meta.env?.DEV
        ? '/api/webhook/order'
        : 'https://n8n.foliumdev.com.br/webhook/order'
    const res = await fetchWithTimeout(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        timeoutMs: 15000
    })
    const ct = res.headers.get('content-type') || ''
    if (ct.includes('application/json')) {
        const data = await res.json() as OrderResponse
        return { ok: res.ok, status: res.status, data }
    }
    const text = await res.text()
    return { ok: res.ok, status: res.status, text }
}
