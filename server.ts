import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory store for pre-enrollment leads
interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  goal: string;
  level: string;
  weeklyDays: number;
  city: string;
  createdAt: string;
}

const leadsDatabase: Lead[] = [];

let aiClient: GoogleGenAI | null = null;
function getAi(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY || '';
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// Pre-enrollment Lead submission
app.post('/api/enrollment', (req, res) => {
  try {
    const { name, phone, email, goal, level, weeklyDays, city } = req.body;
    if (!name || !phone) {
      return res.status(400).json({ error: 'Nome e WhatsApp são obrigatórios.' });
    }

    const newLead: Lead = {
      id: 'lead_' + Date.now(),
      name,
      phone,
      email: email || '',
      goal: goal || 'Iniciar na corrida',
      level: level || 'Iniciante',
      weeklyDays: Number(weeklyDays) || 3,
      city: city || 'Vinhedo',
      createdAt: new Date().toISOString(),
    };

    leadsDatabase.push(newLead);
    console.log(`[Lead Recebido] ${name} - ${phone} (${goal})`);

    return res.json({
      success: true,
      message: 'Pré-matrícula recebida com sucesso!',
      lead: newLead,
    });
  } catch (error) {
    console.error('Erro ao salvar lead:', error);
    return res.status(500).json({ error: 'Erro interno ao processar cadastro.' });
  }
});

// Gemini AI Running Assistant: Weekly Plan Generator
app.post('/api/gemini/plan', async (req, res) => {
  try {
    const { userGoal, currentLevel, availableDays, currentPace, targetRace, locations } = req.body;

    if (!userGoal) {
      return res.status(400).json({ error: 'Por favor, informe seu objetivo na corrida.' });
    }

    const ai = getAi();
    const systemPrompt = `Você é o "Assistente Vania Running", o assistente oficial de inteligência artificial da treinadora Vania Ribeiro, especialista e pós-graduada em Fisiologia do Exercício e Biomecânica em Vinhedo - SP.
Sua missão é gerar uma sugestão de rotina semanal de treinos personalizada, motivadora, técnica e altamente segura para corredores amadores.

Contexto local e metodologia da Coach Vania:
- Cidade: Vinhedo - SP (pontos de treino conhecidos: Represa I para rodagens planas e integração, Observatório para treinos de subida e força, Condomínios para longões de sábado, Pista Municipal para tiros e biomecânica).
- Princípios: Progressão gradual sem lesões, aquecimento dinâmico antes de correr, educativos de corrida, fortalecimento muscular complementar e respeito ao descanso/sono.
- Tom de voz: Acolhedor, profissional, enérgico, técnico sem ser complicado, apaixonado pela corrida.

Formato da resposta:
Gere uma resposta em Markdown bem estruturada contendo:
1. **Diagnóstico & Resumo do Objetivo**: Uma análise rápida e encorajadora do objetivo.
2. **Rotina Semanal Sugerida (Semana 1)**: Estruturada dia a dia (ex: Segunda: Fortalecimento, Terça: Treino de Tiro na Pista Municipal, Quarta: Descanso/Regenerativo, etc.) com distância/tempo, ritmo/intensidade (Percepção de Esforço 1-10 ou Pace sugerido) e foco técnico.
3. **Dica Especial de Biomecânica da Vania**: Cadência, postura dos ombros, aterrissagem do pé.
4. **Indicação de Ponto de Treino em Vinhedo**: Qual local de Vinhedo melhor se adapta a este objetivo.
5. **Chamada amigável**: Convidando para fazer a consultoria completa com a Vania para ajustes de planilhas semanais no app oficial.

Responda sempre em Português do Brasil com formatação impecável.`;

    const userPrompt = `Objetivo do corredor: "${userGoal}"
Nível atual: ${currentLevel || 'Iniciante/Amador'}
Dias disponíveis por semana: ${availableDays || 3} dias
Pace atual estimado: ${currentPace || 'Não informado / Começando agora'}
Foco de prova/distância: ${targetRace || 'Geral / Saúde e Performance'}
Preferência de local em Vinhedo: ${locations || 'Geral (Represa, Pista, Asfalto)'}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.7-flash',
      contents: userPrompt,
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.7,
      },
    });

    const outputText = response.text || 'Não foi possível gerar a planilha no momento. Tente novamente.';
    return res.json({ plan: outputText });
  } catch (error: any) {
    console.error('Erro na chamada do Gemini Plan:', error);
    return res.status(500).json({
      error: 'Ocorreu uma instabilidade ao consultar o Assistente Gemini. Verifique a chave de API ou tente em instantes.',
      details: error?.message,
    });
  }
});

// Gemini AI Running Assistant: Chat interaction
app.post('/api/gemini/chat', async (req, res) => {
  try {
    const { messages, message } = req.body;
    const prompt = message || (messages && messages[messages.length - 1]?.text);

    if (!prompt) {
      return res.status(400).json({ error: 'Mensagem não fornecida.' });
    }

    const ai = getAi();
    const systemPrompt = `Você é o "Assistente Vania Running", chatbot e consultor virtual da assessoria Vania Ribeiro Running Coach (Vinhedo - SP).
Responda a dúvidas de corrida, ritmo, nutrição básica pré-treino, respiração, treinos em subidas em Vinhedo (Observatório), treinos de velocidade (Pista Municipal) e prevenção de canelite/dores articulares.
Seja conciso, prestativo, use emojis adequados com moderação e incentive a prática segura da corrida de rua.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.7-flash',
      contents: prompt,
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.6,
      },
    });

    return res.json({ reply: response.text || 'Estou aqui para ajudar nos seus treinos!' });
  } catch (error: any) {
    console.error('Erro no Gemini Chat:', error);
    return res.status(500).json({
      error: 'Não foi possível obter resposta no momento.',
      details: error?.message,
    });
  }
});

// Setup Vite development middleware or static production serving
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Vania Ribeiro Running Coach Server online at http://localhost:${PORT}`);
  });
}

startServer();
