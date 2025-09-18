import AiChatSession from "../models/AiChatSession.js";
import { openRouterService } from "../services/openRouterService.js";

export const initAiChat = async (req, res) => {
  const userId = req.user._id;
  const { workspaceId } = req.body;

  try {
    let session = await AiChatSession.findOne({ userId, workspaceId });

    if (!session) {
      session = await AiChatSession.create({
        userId,
        workspaceId,
        used: true,
        messages: [],
      });
    }

    return res.status(200).json({ message: "Chat AI session dimulai." });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Gagal memulai AI chat." });
  }
};

export const chatAi = async (req, res) => {
  try {
    const { query, workspaceId } = req.body;
    const userId = req.user._id;

    const session = await AiChatSession.findOne({ userId, workspaceId });
    if (!session) {
      return res
        .status(403)
        .json({ message: "Kamu belum memulai session AI chat." });
    }

    const allowed = [
      "html",
      "css",
      "javascript",
      "<script",
      "<style",
      "<div",
      "function",
      "let",
      "const",
    ];
    const q = query.toLowerCase();
    if (!allowed.some((kw) => q.includes(kw))) {
      return res.status(400).json({
        message:
          "Hanya pertanyaan terkait HTML, CSS, atau JavaScript yang diperbolehkan.",
      });
    }

    const aiResponse = await openRouterService(`
      Kamu adalah AI untuk membantu mahasiswa dengan kode website (HTML, CSS, JavaScript). 
      Tolak permintaan di luar itu. 
      Pertanyaan: ${query}
    `);

    const content = aiResponse.choices?.[0]?.message?.content || "No response";

    session.messages = [
      ...(session.messages || []),
      { role: "user", content: query },
      { role: "assistant", content },
    ];
    await session.save();

    return res.status(200).json({ response: content });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Gagal memproses AI chat." });
  }
};
