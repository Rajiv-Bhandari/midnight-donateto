export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const { donate_to, donor, signature } = req.body;

    const url = `https://scavenger.prod.gd.midnighttge.io/donate_to/${donate_to}/${donor}/${signature}`;

    try {
        const scavRes = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: "{}"
        });

        const data = await scavRes.json();

        return res.status(200).json({
            success: true,
            url_called: url,
            status: scavRes.status,
            response: data
        });

    } catch (err) {
        return res.status(500).json({ success: false, error: err.message });
    }
}