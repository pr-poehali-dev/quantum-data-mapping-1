"""
Отправка заявки с сайта в Telegram-бот владельца.
"""
import json
import os
import urllib.request


def handler(event: dict, context) -> dict:
    headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": headers, "body": ""}

    raw_body = event.get("body")
    if not raw_body or not raw_body.strip():
        body = {}
    elif isinstance(raw_body, str):
        body = json.loads(raw_body)
    else:
        body = raw_body
    name = body.get("name", "").strip()
    phone = body.get("phone", "").strip()
    message = body.get("message", "").strip()

    if not phone:
        return {
            "statusCode": 400,
            "headers": headers,
            "body": json.dumps({"error": "Укажите номер телефона"}),
        }

    token = os.environ["TELEGRAM_BOT_TOKEN"]
    chat_id = os.environ["TELEGRAM_CHAT_ID"]

    text = (
        "🏠 *Новая заявка с сайта*\n\n"
        f"👤 Имя: {name or 'не указано'}\n"
        f"📞 Телефон: {phone}\n"
        f"💬 Пожелания: {message or 'не указано'}"
    )

    payload = json.dumps({
        "chat_id": chat_id,
        "text": text,
        "parse_mode": "Markdown",
    }).encode("utf-8")

    req = urllib.request.Request(
        f"https://api.telegram.org/bot{token}/sendMessage",
        data=payload,
        headers={"Content-Type": "application/json"},
        method="POST",
    )

    with urllib.request.urlopen(req, timeout=10) as resp:
        result = json.loads(resp.read())

    if not result.get("ok"):
        return {
            "statusCode": 500,
            "headers": headers,
            "body": json.dumps({"error": "Telegram error", "details": result}),
        }

    return {
        "statusCode": 200,
        "headers": headers,
        "body": json.dumps({"success": True}),
    }