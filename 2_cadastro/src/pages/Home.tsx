import { v4 as uuidv4 } from 'uuid'
import { useState } from 'react'
import { postWebhookApp } from '../services/webhook'

export function Home() {
    const [loading, setLoading] = useState(false)
    const [responseBody, setResponseBody] = useState<string>('')
    const [errorMsg, setErrorMsg] = useState<string>('')

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const name = String(formData.get('name') || '')
        const email = String(formData.get('email') || '')
        const id = uuidv4()
        if (!name || !email) {
            alert('Preencha nome e email.')
            return
        }
        try {
            setLoading(true)
            setErrorMsg('')
            setResponseBody('')
            const result = await postWebhookApp({id, name, email })
            if (!result.ok) {
                setErrorMsg(`Erro ao enviar: ${result.status} ${result.text || ''}`)
                setLoading(false)
                return
            }
            const body = result.data !== undefined ? JSON.stringify(result.data, null, 2) : (result.text || '')
            setResponseBody(body)
            setLoading(false)
            event.currentTarget.reset()
        } catch {
            setErrorMsg('Falha de conexão ao enviar.')
            setLoading(false)
        }
    }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Nome:</label>
        <input type="text" id="name" name="name" />
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" />
        <button type="submit" disabled={loading}>{loading ? 'Enviando...' : 'Enviar'}</button>
      </form>
      {errorMsg && <p style={{ color: 'tomato', marginTop: 12 }}>{errorMsg}</p>}
      {responseBody && (
        <div style={{ textAlign: 'left', marginTop: 12 }}>
          <strong>Resposta do webhook:</strong>
          <pre style={{ background: '#111', color: '#ddd', padding: 12, borderRadius: 8 }}>
            {responseBody}
          </pre>
        </div>
      )}
    </div>
  )
}
