"""
Отправка заявки с сайта на email torvitmih@mail.ru через SMTP Mail.ru.
"""
import json
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


def handler(event: dict, context) -> dict:
    headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": headers, "body": ""}

    try:
        body = json.loads(event.get("body") or "{}")
        name = body.get("name", "").strip()
        phone = body.get("phone", "").strip()
        message = body.get("message", "").strip()

        if not phone:
            return {
                "statusCode": 400,
                "headers": headers,
                "body": json.dumps({"error": "Укажите номер телефона"}),
            }

        smtp_user = os.environ.get("SMTP_USER", "").strip()
        smtp_password = os.environ.get("SMTP_PASSWORD", "").strip()

        if not smtp_user or not smtp_password:
            print("ERROR: SMTP_USER or SMTP_PASSWORD not set")
            return {
                "statusCode": 500,
                "headers": headers,
                "body": json.dumps({"error": "SMTP не настроен"}),
            }

        msg = MIMEMultipart("alternative")
        msg["Subject"] = f"Новая заявка с сайта — {name or 'Без имени'}"
        msg["From"] = smtp_user
        msg["To"] = "torvitmih@mail.ru"

        text_body = f"""Новая заявка с сайта SIP Дома Омск

Имя: {name or 'не указано'}
Телефон: {phone}
Сообщение: {message or 'не указано'}
"""

        html_body = f"""
<div style="font-family: Arial, sans-serif; max-width: 500px; padding: 24px; background: #f8f9fa; border-radius: 8px;">
  <h2 style="color: #1a1f2e; margin-bottom: 20px;">Новая заявка с сайта</h2>
  <table style="width: 100%; border-collapse: collapse;">
    <tr>
      <td style="padding: 8px 0; color: #666; width: 120px;">Имя:</td>
      <td style="padding: 8px 0; color: #1a1f2e; font-weight: bold;">{name or 'не указано'}</td>
    </tr>
    <tr>
      <td style="padding: 8px 0; color: #666;">Телефон:</td>
      <td style="padding: 8px 0; color: #1a1f2e; font-weight: bold;"><a href="tel:{phone}" style="color: #2563eb;">{phone}</a></td>
    </tr>
    <tr>
      <td style="padding: 8px 0; color: #666;">Сообщение:</td>
      <td style="padding: 8px 0; color: #1a1f2e;">{message or 'не указано'}</td>
    </tr>
  </table>
</div>
"""

        msg.attach(MIMEText(text_body, "plain", "utf-8"))
        msg.attach(MIMEText(html_body, "html", "utf-8"))

        with smtplib.SMTP("smtp.mail.ru", 587, timeout=15) as server:
            server.starttls()
            server.login(smtp_user, smtp_password)
            server.sendmail(smtp_user, "torvitmih@mail.ru", msg.as_string())

        return {
            "statusCode": 200,
            "headers": headers,
            "body": json.dumps({"success": True}),
        }

    except Exception as e:
        import traceback
        print("SMTP ERROR:", traceback.format_exc())
        return {
            "statusCode": 500,
            "headers": headers,
            "body": json.dumps({"error": str(e)}),
        }