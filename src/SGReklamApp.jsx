// README'yi tetiklemek için küçük bir değişiklik
// SG Reklam - Otomasyon Paneli v1.0.1 (deploy tetikleyici)

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function SGReklamApp() {
  const [clientName, setClientName] = useState("");
  const [sector, setSector] = useState("");
  const [goal, setGoal] = useState("");
  const [adCopy, setAdCopy] = useState("");
  const [visualLink, setVisualLink] = useState("");
  const [weeklyPlan, setWeeklyPlan] = useState("");
  const [performance, setPerformance] = useState({ budget: "", impressions: "", clicks: "", sales: "" });
  const [roas, setRoas] = useState("");

  const generateAd = () => {
    if (!clientName || !sector || !goal) {
      setAdCopy("Lütfen tüm alanları doldurun.");
      return;
    }
    const text = `📢 ${clientName} için özel kampanya!
${sector} sektöründe, hedef: ${goal}.
Şimdi dene, fırsatı kaçırma!`;
    setAdCopy(text);
    setVisualLink("https://www.canva.com/templates/?query=reklam");
    setWeeklyPlan(`Pazartesi: Yeni kampanya yayına alınır\nSalı: Rakip analizi yapılır\nÇarşamba: Yeni kreatif hazırlanır\nPerşembe: Performans kontrolü\nCuma: Raporlama ve optimizasyon`);
  };

  const calculateROAS = () => {
    const budget = parseFloat(performance.budget);
    const sales = parseFloat(performance.sales);
    if (!isNaN(budget) && !isNaN(sales) && budget > 0) {
      setRoas((sales / budget).toFixed(2));
    } else {
      setRoas("Geçersiz veri");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold text-center">SG Reklam - Müşteri Otomasyon Paneli</h1>

      <Card>
        <CardContent className="space-y-4 p-4">
          <Input placeholder="Müşteri Adı" value={clientName} onChange={(e) => setClientName(e.target.value)} />
          <Input placeholder="Sektör" value={sector} onChange={(e) => setSector(e.target.value)} />
          <Input placeholder="Hedef (örn. daha fazla satış, rezervasyon)" value={goal} onChange={(e) => setGoal(e.target.value)} />
          <Button onClick={generateAd}>Reklam Metni Oluştur</Button>

          {adCopy && (
            <div className="bg-gray-100 p-4 rounded text-sm whitespace-pre-wrap">
              <strong>Reklam Metni:</strong>
              <br />
              {adCopy}
              <br />
              <br />
              <strong>Canva Görsel Şablonları:</strong>
              <br />
              <a href={visualLink} target="_blank" className="text-blue-600 underline">Canva'da Şablonları Gör</a>
              <br />
              <br />
              <strong>Haftalık İçerik Planı:</strong>
              <br />
              {weeklyPlan}
              <br />
              <br />
              <strong>Rakip Reklam Analizi:</strong>
              <br />
              <a href="https://www.facebook.com/ads/library" target="_blank" className="text-blue-600 underline">Meta Ad Library'yi Aç</a>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardContent className="space-y-4 p-4">
          <h2 className="text-lg font-semibold">Performans Raporu</h2>
          <Input placeholder="Bütçe (TL)" value={performance.budget} onChange={(e) => setPerformance({ ...performance, budget: e.target.value })} />
          <Input placeholder="Gösterim Sayısı" value={performance.impressions} onChange={(e) => setPerformance({ ...performance, impressions: e.target.value })} />
          <Input placeholder="Tıklama Sayısı" value={performance.clicks} onChange={(e) => setPerformance({ ...performance, clicks: e.target.value })} />
          <Input placeholder="Satış Tutarı (TL)" value={performance.sales} onChange={(e) => setPerformance({ ...performance, sales: e.target.value })} />
          <Button onClick={calculateROAS}>ROAS Hesapla</Button>
          {roas && (
            <div className="bg-gray-100 p-4 rounded text-sm">ROAS: {roas}</div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
