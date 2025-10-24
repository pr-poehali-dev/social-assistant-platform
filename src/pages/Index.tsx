import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';

const Index = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [appealText, setAppealText] = useState('');
  const [predictedCategory, setPredictedCategory] = useState('');
  const [urgencyLevel, setUrgencyLevel] = useState([50]);

  const handleTextChange = (text: string) => {
    setAppealText(text);
    
    if (text.length > 20) {
      if (text.toLowerCase().includes('помощь') || text.toLowerCase().includes('деньги') || text.toLowerCase().includes('продукты')) {
        setPredictedCategory('Материальная помощь');
      } else if (text.toLowerCase().includes('отопление') || text.toLowerCase().includes('жилье') || text.toLowerCase().includes('ремонт')) {
        setPredictedCategory('Жилищные вопросы');
      } else if (text.toLowerCase().includes('консультация') || text.toLowerCase().includes('документы') || text.toLowerCase().includes('право')) {
        setPredictedCategory('Юридическая помощь');
      } else {
        setPredictedCategory('Общий вопрос');
      }
    }
  };

  const appeals = [
    { id: 1, name: 'Иванова А.А.', category: 'Жилищные вопросы', urgency: 'high', status: 'new', text: 'Нет отопления, в доме маленькие дети', district: 'Заполярный' },
    { id: 2, name: 'Петров Б.В.', category: 'Материальная помощь', urgency: 'medium', status: 'processing', text: 'Нужна продуктовая помощь', district: 'Кольский' },
    { id: 3, name: 'Сидорова Е.К.', category: 'Юридическая помощь', urgency: 'low', status: 'new', text: 'Вопрос по оформлению документов', district: 'Терский' },
  ];

  const stats = [
    { label: 'Обращений сегодня', value: '47', trend: '+12%', icon: 'FileText' },
    { label: 'Среднее время реакции', value: '2.4ч', trend: '-15%', icon: 'Clock' },
    { label: 'Решено задач', value: '89%', trend: '+5%', icon: 'CheckCircle2' },
    { label: 'В обработке', value: '23', trend: '', icon: 'AlertCircle' },
  ];

  const districtData = [
    { district: 'Кольский', count: 12, lat: 68.8, lng: 33.0 },
    { district: 'Ловозерский', count: 8, lat: 67.8, lng: 35.0 },
    { district: 'Терский', count: 15, lat: 66.3, lng: 38.5 },
    { district: 'Заполярный', count: 7, lat: 69.4, lng: 30.8 },
  ];

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b bg-white sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-primary text-white p-2 rounded-lg">
                <Icon name="Heart" size={24} />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-foreground">СоцАссистент</h1>
                <p className="text-xs text-muted-foreground">Помогаем быстрее. Решаем эффективнее.</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant={activeTab === 'home' ? 'default' : 'ghost'} onClick={() => setActiveTab('home')}>
                Главная
              </Button>
              <Button variant={activeTab === 'appeal' ? 'default' : 'ghost'} onClick={() => setActiveTab('appeal')}>
                Подать обращение
              </Button>
              <Button variant={activeTab === 'dashboard' ? 'default' : 'ghost'} onClick={() => setActiveTab('dashboard')}>
                Дашборд
              </Button>
              <Button variant={activeTab === 'appeals' ? 'default' : 'ghost'} onClick={() => setActiveTab('appeals')}>
                Обращения
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {activeTab === 'home' && (
        <div className="container mx-auto px-6 py-16">
          <div className="max-w-4xl mx-auto text-center space-y-12">
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-5xl font-bold text-foreground leading-tight">
                Помощь рядом
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Расскажите о своей проблеме, и мы направим ваше обращение в нужную службу
              </p>
              <Button size="lg" className="text-lg px-8 py-6" onClick={() => setActiveTab('appeal')}>
                Подать обращение
              </Button>
            </div>

            <div className="grid md:grid-cols-3 gap-8 pt-12">
              <Card className="p-8 text-center space-y-4 hover:shadow-lg transition-shadow">
                <div className="mx-auto bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center">
                  <Icon name="MessageSquare" size={32} className="text-primary" />
                </div>
                <h3 className="text-lg font-semibold">1. Опишите ситуацию</h3>
                <p className="text-muted-foreground">Текстом или голосом – как удобнее</p>
              </Card>

              <Card className="p-8 text-center space-y-4 hover:shadow-lg transition-shadow">
                <div className="mx-auto bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center">
                  <Icon name="Brain" size={32} className="text-accent" />
                </div>
                <h3 className="text-lg font-semibold">2. ИИ анализирует</h3>
                <p className="text-muted-foreground">Автоматическое определение категории и направление в службу</p>
              </Card>

              <Card className="p-8 text-center space-y-4 hover:shadow-lg transition-shadow">
                <div className="mx-auto bg-destructive/10 w-16 h-16 rounded-full flex items-center justify-center">
                  <Icon name="Heart" size={32} className="text-destructive" />
                </div>
                <h3 className="text-lg font-semibold">3. Получаете помощь</h3>
                <p className="text-muted-foreground">Быстрая обработка и оперативное решение вопроса</p>
              </Card>
            </div>

            <Card className="p-8 space-y-4 bg-accent/5 border-accent/20">
              <h3 className="text-2xl font-semibold text-center">Преимущества системы</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="flex items-start gap-3">
                  <Icon name="CheckCircle2" size={24} className="text-accent mt-1" />
                  <p>Не нужно самому искать, куда обращаться</p>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="Zap" size={24} className="text-accent mt-1" />
                  <p>Сокращено время на обработку запроса</p>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="Shield" size={24} className="text-accent mt-1" />
                  <p>Ваши данные в безопасности</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      )}

      {activeTab === 'appeal' && (
        <div className="container mx-auto px-6 py-12">
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold">Подача обращения</h2>
              <p className="text-muted-foreground">Опишите вашу проблему максимально подробно</p>
            </div>

            <Card className="p-8 space-y-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Опишите вашу проблему</label>
                  <Button variant="outline" size="sm">
                    <Icon name="Mic" size={16} className="mr-2" />
                    Голосовой ввод
                  </Button>
                </div>
                <Textarea
                  placeholder="Например: Требуется помощь с отоплением, в квартире холодно, есть маленький ребенок..."
                  className="min-h-[150px] text-base"
                  value={appealText}
                  onChange={(e) => handleTextChange(e.target.value)}
                />
                {predictedCategory && (
                  <div className="flex items-center gap-2 p-3 bg-primary/5 rounded-lg border border-primary/20">
                    <Icon name="Brain" size={20} className="text-primary" />
                    <span className="text-sm">
                      Похоже, ваше обращение относится к:
                      <Badge className="ml-2" variant="secondary">{predictedCategory}</Badge>
                    </span>
                  </div>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Имя (необязательно)</label>
                  <Input placeholder="Ваше имя" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Контакт</label>
                  <Input placeholder="Телефон или email" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Адрес</label>
                <Input placeholder="Для выездных служб" />
              </div>

              <div className="space-y-3">
                <label className="text-sm font-medium">Насколько срочна проблема?</label>
                <div className="space-y-2">
                  <Slider
                    value={urgencyLevel}
                    onValueChange={setUrgencyLevel}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Плановый вопрос</span>
                    <span className={urgencyLevel[0] > 70 ? 'text-destructive font-medium' : ''}>
                      {urgencyLevel[0] > 70 ? 'Требуется срочное вмешательство' : 'Умеренная срочность'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <input type="checkbox" id="consent" className="mt-1" />
                <label htmlFor="consent" className="text-sm text-muted-foreground">
                  Я согласен на обработку персональных данных
                </label>
              </div>

              <Button size="lg" className="w-full">
                <Icon name="Send" size={20} className="mr-2" />
                Отправить обращение
              </Button>
            </Card>
          </div>
        </div>
      )}

      {activeTab === 'dashboard' && (
        <div className="container mx-auto px-6 py-12 space-y-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">Аналитический дашборд</h2>
            <p className="text-muted-foreground">Мурманская область</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {stats.map((stat, idx) => (
              <Card key={idx} className="p-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-3xl font-bold">{stat.value}</p>
                    {stat.trend && (
                      <Badge variant={stat.trend.startsWith('+') ? 'default' : 'secondary'} className="text-xs">
                        {stat.trend}
                      </Badge>
                    )}
                  </div>
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <Icon name={stat.icon as any} size={24} className="text-primary" />
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Icon name="TrendingUp" size={20} />
                Динамика обращений
              </h3>
              <div className="h-64 flex items-end justify-around gap-2">
                {[32, 45, 38, 52, 47, 61, 47].map((height, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                    <div
                      className="w-full bg-primary rounded-t-lg transition-all hover:bg-primary/80"
                      style={{ height: `${height}%` }}
                    />
                    <span className="text-xs text-muted-foreground">
                      {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'][idx]}
                    </span>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Icon name="PieChart" size={20} />
                Распределение по типам
              </h3>
              <div className="space-y-4">
                {[
                  { type: 'Материальная помощь', percent: 35, color: 'bg-primary' },
                  { type: 'Жилищные вопросы', percent: 28, color: 'bg-accent' },
                  { type: 'Юридическая помощь', percent: 20, color: 'bg-destructive' },
                  { type: 'Медицинская помощь', percent: 17, color: 'bg-yellow-500' },
                ].map((item, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{item.type}</span>
                      <span className="font-medium">{item.percent}%</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div
                        className={`${item.color} h-2 rounded-full transition-all`}
                        style={{ width: `${item.percent}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Icon name="MapPin" size={20} />
              Тепловая карта обращений по районам
            </h3>
            <div className="relative h-96 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg overflow-hidden">
              {districtData.map((district, idx) => (
                <div
                  key={idx}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                  style={{
                    left: `${((district.lng - 30) / 10) * 100}%`,
                    top: `${100 - ((district.lat - 66) / 4) * 100}%`,
                  }}
                >
                  <div
                    className={`rounded-full transition-all ${
                      district.count > 10
                        ? 'bg-destructive/60 w-16 h-16'
                        : district.count > 5
                        ? 'bg-yellow-500/60 w-12 h-12'
                        : 'bg-accent/60 w-8 h-8'
                    } flex items-center justify-center text-white font-bold group-hover:scale-110`}
                  >
                    {district.count}
                  </div>
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-white px-3 py-1 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap text-sm">
                    {district.district}: {district.count} обращений
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Icon name="Lightbulb" size={20} className="text-primary" />
              ИИ-инсайты и рекомендации
            </h3>
            <div className="space-y-4">
              <div className="flex gap-3 p-4 bg-white rounded-lg border border-destructive/20">
                <Icon name="AlertTriangle" size={24} className="text-destructive flex-shrink-0" />
                <div className="space-y-1">
                  <p className="font-medium">Критическое обращение требует внимания</p>
                  <p className="text-sm text-muted-foreground">
                    Обращение №7845 от Ивановой А.А. содержит ключевые слова: «нет отопления», «дети», «мороз». 
                    Приоритет: КРИТИЧЕСКИЙ
                  </p>
                </div>
              </div>
              <div className="flex gap-3 p-4 bg-white rounded-lg">
                <Icon name="TrendingUp" size={24} className="text-accent flex-shrink-0" />
                <div className="space-y-1">
                  <p className="font-medium">Рост запросов в Заполярном районе</p>
                  <p className="text-sm text-muted-foreground">
                    На 25% выросло количество запросов на продуктовую помощь. Рекомендуется проверить запасы и рассмотреть возможность адресной выдачи.
                  </p>
                </div>
              </div>
              <div className="flex gap-3 p-4 bg-white rounded-lg">
                <Icon name="Snowflake" size={24} className="text-primary flex-shrink-0" />
                <div className="space-y-1">
                  <p className="font-medium">Сезонная тенденция</p>
                  <p className="text-sm text-muted-foreground">
                    С понижением температуры учащаются запросы на помощь с отоплением. Рекомендуем заранее подготовить мобильные бригады.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {activeTab === 'appeals' && (
        <div className="container mx-auto px-6 py-12 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold">Работа с обращениями</h2>
              <p className="text-muted-foreground">Управление и обработка входящих запросов</p>
            </div>
            <div className="flex gap-3">
              <Select defaultValue="all">
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все статусы</SelectItem>
                  <SelectItem value="new">Новые</SelectItem>
                  <SelectItem value="processing">В работе</SelectItem>
                  <SelectItem value="solved">Решено</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="all-urgency">
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-urgency">Все приоритеты</SelectItem>
                  <SelectItem value="high">Срочно</SelectItem>
                  <SelectItem value="medium">Средний</SelectItem>
                  <SelectItem value="low">Низкий</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-4">
            {appeals.map((appeal) => (
              <Card
                key={appeal.id}
                className={`p-6 border-l-4 hover:shadow-md transition-shadow ${
                  appeal.urgency === 'high'
                    ? 'border-l-destructive'
                    : appeal.urgency === 'medium'
                    ? 'border-l-yellow-500'
                    : 'border-l-accent'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-3 flex-1">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h3 className="font-semibold text-lg">Обращение #{appeal.id}</h3>
                      <Badge variant="outline">{appeal.category}</Badge>
                      <Badge
                        variant={appeal.urgency === 'high' ? 'destructive' : 'secondary'}
                      >
                        {appeal.urgency === 'high' ? 'Срочно' : appeal.urgency === 'medium' ? 'Средний' : 'Низкий'}
                      </Badge>
                      <Badge variant={appeal.status === 'new' ? 'default' : 'secondary'}>
                        {appeal.status === 'new' ? 'Новое' : 'В работе'}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Icon name="User" size={16} />
                        {appeal.name}
                      </span>
                      <span className="flex items-center gap-1">
                        <Icon name="MapPin" size={16} />
                        {appeal.district}
                      </span>
                    </div>
                    <p className="text-muted-foreground">{appeal.text}</p>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Button variant="outline" size="sm">
                      <Icon name="Eye" size={16} className="mr-2" />
                      Открыть
                    </Button>
                    <Button size="sm">
                      <Icon name="UserPlus" size={16} className="mr-2" />
                      Назначить
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
