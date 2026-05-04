import { useState } from "react"
import { ArrowRight, CheckCircle } from "lucide-react"
import { HighlightedText } from "./HighlightedText"

const SEND_LEAD_URL = "https://functions.poehali.dev/55a7371d-e383-4c4e-86d3-4520dd0a96b5"

export function LeadForm() {
  const [form, setForm] = useState({ name: "", phone: "", message: "" })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    setError("")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.phone.trim()) {
      setError("Пожалуйста, укажите номер телефона")
      return
    }
    setLoading(true)
    try {
      const res = await fetch(SEND_LEAD_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (data.success) {
        setSuccess(true)
      } else {
        setError(data.error || "Что-то пошло не так. Попробуйте позвонить нам напрямую.")
      }
    } catch {
      setError("Ошибка соединения. Позвоните нам: +7 (950) 330-72-52")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="lead" className="py-32 md:py-29 bg-secondary/40">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left */}
          <div>
            <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6">Бесплатная консультация</p>
            <h2 className="text-5xl md:text-6xl font-medium leading-[1.1] tracking-tight mb-6 text-balance lg:text-7xl">
              Рассчитаем стоимость
              <br />
              <HighlightedText>вашего дома</HighlightedText>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8 max-w-md">
              Оставьте заявку — свяжемся в течение дня, обсудим площадь, планировку и бюджет. Без обязательств.
            </p>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-foreground/40 flex-shrink-0" />
                Работаем в Омске и Омской области
              </div>
              <div className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-foreground/40 flex-shrink-0" />
                Ипотека — аккредитованы в банках
              </div>
              <div className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-foreground/40 flex-shrink-0" />
                Строительство за 3 месяца под ключ
              </div>
              <div className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-foreground/40 flex-shrink-0" />
                Поэтапная оплата под ваш бюджет
              </div>
            </div>

            <div className="mt-10 pt-8 border-t border-border">
              <p className="text-sm text-muted-foreground mb-3">Или напишите напрямую:</p>
              <div className="flex flex-col gap-2">
                <a href="tel:+79503307252" className="text-foreground font-medium hover:underline underline-offset-4 transition-all">
                  +7 (950) 330-72-52
                </a>
                <a
                  href="https://vk.com/id12631178"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Написать ВКонтакте
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Right — form */}
          <div className="bg-background border border-border p-8 md:p-10">
            {success ? (
              <div className="flex flex-col items-center justify-center text-center py-12 gap-4">
                <CheckCircle className="w-12 h-12 text-foreground" strokeWidth={1.25} />
                <h3 className="text-2xl font-medium">Заявка отправлена!</h3>
                <p className="text-muted-foreground leading-relaxed max-w-xs">
                  Мы получили вашу заявку и свяжемся в течение дня. Если срочно — звоните: <a href="tel:+79503307252" className="text-foreground font-medium">+7 (950) 330-72-52</a>
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm text-muted-foreground mb-2">Ваше имя</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Иван Иванов"
                    className="w-full border border-border bg-transparent px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-foreground transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm text-muted-foreground mb-2">Телефон <span className="text-foreground">*</span></label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+7 (950) 000-00-00"
                    className="w-full border border-border bg-transparent px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-foreground transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm text-muted-foreground mb-2">Площадь и пожелания</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Например: одноэтажный дом 120 м², участок в Омском районе"
                    className="w-full border border-border bg-transparent px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-foreground transition-colors resize-none"
                  />
                </div>

                {error && (
                  <p className="text-sm text-red-500">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full inline-flex items-center justify-center gap-3 bg-foreground text-primary-foreground px-8 py-4 text-sm tracking-wide hover:bg-foreground/90 transition-colors duration-300 group disabled:opacity-60"
                >
                  {loading ? "Отправляем..." : "Получить расчёт бесплатно"}
                  {!loading && <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />}
                </button>

                <p className="text-xs text-muted-foreground/60 text-center">
                  Отправляя заявку, вы соглашаетесь на обработку персональных данных
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
