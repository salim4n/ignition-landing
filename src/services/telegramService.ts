interface UserInfo {
    ip?: string;
    userAgent: string;
    language: string;
    timestamp: string;
    timezone: string;
    screenResolution: string;
}

const TELEGRAM_BOT_TOKEN = "7877279495:AAHCjrNBHtTNkqwhJAqgAycG6XrPOWbpBBg";
const CHAT_ID = "981600974";

export const sendTelegramMessage = async (userInfo: UserInfo) => {
    if (!TELEGRAM_BOT_TOKEN || !CHAT_ID) {
        console.error('Telegram credentials not configured');
        return;
    }

    const message = `
🎯 Vector DB Demo Clicked!

👤 User Information:
- IP: ${userInfo.ip || 'Not available'}
- Browser: ${userInfo.userAgent}
- Language: ${userInfo.language}
- Time: ${userInfo.timestamp}
- Timezone: ${userInfo.timezone}
- Screen: ${userInfo.screenResolution}
    `;

    try {
        const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: CHAT_ID,
                text: message,
                parse_mode: 'Markdown'
            })
        });

        if (!response.ok) {
            throw new Error('Failed to send Telegram message');
        }
    } catch (error) {
        console.error('Error sending Telegram message:', error);
    }
};
