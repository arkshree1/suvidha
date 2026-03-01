import { useState, useRef, useEffect, useCallback } from 'react';
import { MessageCircle, X, Mic, MicOff, Send, Volume2, VolumeX } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useLocation } from 'wouter';

interface ChatMessage {
  role: 'user' | 'arya';
  text: string;
}

const speechLangMap: Record<string, string> = {
  en: 'en-IN', hi: 'hi-IN', mr: 'mr-IN', ta: 'ta-IN', bn: 'bn-IN',
  te: 'te-IN', kn: 'kn-IN', gu: 'gu-IN', ml: 'ml-IN', pa: 'pa-IN',
  or: 'or-IN', as: 'as-IN', ur: 'ur-IN', sa: 'sa-IN', ne: 'ne-NP',
  sd: 'sd-IN', kok: 'kok-IN', mni: 'mni-IN', brx: 'brx-IN',
  doi: 'doi-IN', ks: 'ks-IN', mai: 'mai-IN', sat: 'sat-IN',
};

export default function AryaChatbot() {
  const { language, t } = useLanguage();
  const [, navigate] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [ttsEnabled, setTtsEnabled] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const greeting = t('aryaGreeting');
      setMessages([{ role: 'arya', text: greeting }]);
      if (ttsEnabled) speak(greeting);
    }
  }, [isOpen]);

  const speak = useCallback((text: string) => {
    if (!ttsEnabled || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = speechLangMap[language] || 'en-IN';
    utterance.rate = 0.9;
    utterance.pitch = 1.1;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  }, [language, ttsEnabled]);

  const getResponse = useCallback((userMsg: string): string => {
    const msg = userMsg.toLowerCase();

    const electricityKeywords = ['electricity', 'bijli', 'बिजली', 'वीज', 'மின்', 'বিদ্যুৎ', 'విద్యుత్', 'ವಿದ್ಯುತ್', 'વીજ', 'വൈദ്യുതി', 'ਬਿਜਲੀ', 'بجلی', 'light', 'bill', 'power', 'meter'];
    const gasKeywords = ['gas', 'गैस', 'गॅस', 'எரிவாயு', 'গ্যাস', 'గ్యాస్', 'ಗ್ಯಾಸ್', 'ગેસ', 'ഗ്യാസ്', 'ਗੈਸ', 'گیس', 'lpg', 'cylinder', 'png', 'सिलेंडर'];
    const waterKeywords = ['water', 'पानी', 'पाणी', 'நீர்', 'জল', 'పానీ', 'నీరు', 'ನೀರು', 'પાણી', 'ജലം', 'ਪਾਣੀ', 'پانی', 'jal', 'neer'];
    const municipalKeywords = ['municipal', 'nagar', 'नगर', 'tax', 'कर', 'property', 'संपत्ति', 'license', 'certificate', 'waste', 'building', 'birth', 'death', 'நகர', 'পৌর', 'మున్సి'];
    const grievanceKeywords = ['complaint', 'grievance', 'शिकायत', 'तक्रार', 'புகார்', 'অভিযোগ', 'ఫిర్యాదు', 'ದೂರು', 'ફરિયાદ', 'പരാതി', 'ਸ਼ਿਕਾਇਤ', 'شکایت', 'problem', 'issue'];
    const documentKeywords = ['document', 'receipt', 'रसीद', 'पावती', 'print', 'history', 'status', 'certificate', 'no dues', 'summary', 'ரசீது', 'রসিদ', 'రసీదు'];

    if (electricityKeywords.some(k => msg.includes(k))) {
      setTimeout(() => navigate('/electricity'), 2000);
      return t('aryaHelpElectricity');
    }
    if (gasKeywords.some(k => msg.includes(k))) {
      setTimeout(() => navigate('/gas'), 2000);
      return t('aryaHelpGas');
    }
    if (waterKeywords.some(k => msg.includes(k))) {
      setTimeout(() => navigate('/water'), 2000);
      return t('aryaHelpWater');
    }
    if (municipalKeywords.some(k => msg.includes(k))) {
      setTimeout(() => navigate('/municipal'), 2000);
      return t('aryaHelpMunicipal');
    }
    if (grievanceKeywords.some(k => msg.includes(k))) {
      setTimeout(() => navigate('/grievance'), 2000);
      return t('aryaHelpGrievance');
    }
    if (documentKeywords.some(k => msg.includes(k))) {
      setTimeout(() => navigate('/documents'), 2000);
      return t('aryaHelpDocuments');
    }

    return t('aryaDefault');
  }, [language, t, navigate]);

  const handleSend = useCallback(() => {
    const trimmed = inputText.trim();
    if (!trimmed) return;

    setMessages(prev => [...prev, { role: 'user', text: trimmed }]);
    setInputText('');

    setTimeout(() => {
      const response = getResponse(trimmed);
      setMessages(prev => [...prev, { role: 'arya', text: response }]);
      if (ttsEnabled) speak(response);
    }, 600);
  }, [inputText, getResponse, speak, ttsEnabled]);

  const toggleListening = useCallback(() => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      setMessages(prev => [...prev, { role: 'arya', text: t('aryaDefault') }]);
      return;
    }

    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = speechLangMap[language] || 'en-IN';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInputText(transcript);
      setIsListening(false);
      setMessages(prev => [...prev, { role: 'user', text: transcript }]);

      setTimeout(() => {
        const response = getResponse(transcript);
        setMessages(prev => [...prev, { role: 'arya', text: response }]);
        if (ttsEnabled) speak(response);
      }, 600);
    };

    recognition.onerror = () => {
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;
    recognition.start();
    setIsListening(true);
  }, [isListening, language, getResponse, speak, ttsEnabled]);

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-24 right-5 z-[200] w-[68px] h-[68px] rounded-full bg-gradient-to-br from-[#F26522] to-[#E05511] text-white flex items-center justify-center animate-chatbot-pulse"
          style={{ boxShadow: '0 6px 24px rgba(242,101,34,0.45)' }}
          aria-label="Open Arya Chatbot"
          data-testid="button-arya-open"
        >
          <div className="relative">
            <MessageCircle size={30} />
            <span className="absolute -top-1 -right-1 w-[14px] h-[14px] rounded-full bg-[#28A745] border-2 border-white animate-ping-slow" />
          </div>
        </button>
      )}

      {!isOpen && (
        <div className="fixed bottom-[100px] right-[80px] z-[199] bg-white px-4 py-2 rounded-xl text-[14px] font-semibold text-[#212529] animate-chatbot-nudge" style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.12)' }} data-testid="arya-nudge-label">
          <span>{t('aryaName')}</span>
          <div className="absolute bottom-[-6px] right-[12px] w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-white" />
        </div>
      )}

      {isOpen && (
        <div
          className="fixed bottom-4 right-4 z-[200] w-[380px] max-w-[calc(100vw-2rem)] bg-white rounded-2xl border-2 border-[#DEE2E6] flex flex-col animate-slideUp"
          style={{ height: '520px', maxHeight: 'calc(100vh - 120px)', boxShadow: '0 12px 48px rgba(0,0,0,0.15)' }}
          data-testid="arya-chat-window"
        >
          <div className="bg-gradient-to-r from-[#006EB3] to-[#0288D1] text-white px-4 py-3 rounded-t-2xl flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-[40px] h-[40px] rounded-full bg-white/20 flex items-center justify-center">
                <MessageCircle size={22} />
              </div>
              <div>
                <h3 className="text-[16px] font-bold leading-tight">{t('aryaName')}</h3>
                <p className="text-[11px] opacity-80">
                  {isListening ? t('aryaListening') : isSpeaking ? '...' : 'Online'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => { setTtsEnabled(!ttsEnabled); if (isSpeaking) window.speechSynthesis.cancel(); }}
                className="w-[36px] h-[36px] rounded-lg bg-white/20 flex items-center justify-center active:bg-white/30"
                aria-label="Toggle voice"
                data-testid="button-arya-tts"
              >
                {ttsEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
              </button>
              <button
                onClick={() => { setIsOpen(false); window.speechSynthesis.cancel(); }}
                className="w-[36px] h-[36px] rounded-lg bg-white/20 flex items-center justify-center active:bg-white/30"
                aria-label="Close chatbot"
                data-testid="button-arya-close"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3" data-testid="arya-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[85%] px-4 py-3 rounded-2xl text-[14px] leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-[#006EB3] text-white rounded-br-sm'
                      : 'bg-[#F5F7FA] text-[#212529] rounded-bl-sm border border-[#DEE2E6]'
                  }`}
                >
                  {msg.role === 'arya' && (
                    <span className="text-[11px] font-bold text-[#006EB3] block mb-1">{t('aryaName')}</span>
                  )}
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-3 border-t border-[#DEE2E6] flex-shrink-0">
            <div className="flex items-center gap-2">
              <button
                onClick={toggleListening}
                className={`w-[44px] h-[44px] rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                  isListening
                    ? 'bg-[#DC3545] text-white animate-pulse'
                    : 'bg-[#F5F7FA] text-[#006EB3] border border-[#DEE2E6] active:bg-[#E3F2FD]'
                }`}
                aria-label={isListening ? 'Stop listening' : 'Start voice input'}
                data-testid="button-arya-mic"
              >
                {isListening ? <MicOff size={20} /> : <Mic size={20} />}
              </button>
              <input
                ref={inputRef}
                type="text"
                value={inputText}
                onChange={e => setInputText(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
                placeholder={t('aryaTypePlaceholder')}
                className="flex-1 h-[44px] px-4 rounded-full bg-[#F5F7FA] border border-[#DEE2E6] text-[14px] text-[#212529] placeholder:text-[#ADB5BD] focus:outline-none focus:border-[#006EB3] focus:ring-2 focus:ring-[#006EB3]/20"
                data-testid="input-arya-message"
              />
              <button
                onClick={handleSend}
                disabled={!inputText.trim()}
                className="w-[44px] h-[44px] rounded-full bg-[#006EB3] text-white flex items-center justify-center flex-shrink-0 disabled:opacity-40 active:bg-[#005A94] transition-colors"
                aria-label="Send message"
                data-testid="button-arya-send"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
