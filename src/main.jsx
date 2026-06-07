import React, {useMemo, useState} from 'react';
import { createRoot } from 'react-dom/client';
import { MapPin, Mountain, Route, Waves, TreePine, Compass, ExternalLink, CalendarCheck, Sun, Wind, Droplets, ShieldAlert, Star, Gauge, Car, Search, AlertTriangle, Maximize2, X } from 'lucide-react';
import './styles.css';

const routes = [
  {
    id:'pr6-risco', order:'01', group:'Близкие красивые', name:'PR6 + PR6.1', title:'Levada das 25 Fontes + Risco',
    short:'Классика Rabaçal: лавровый лес, левады, 25 источников и высокий водопад Risco. Must‑do, но популярно.',
    score:{beauty:9,difficulty:5,distanceFromCalheta:3},
    distance:'примерно 10–11 км в связке', duration:'полдня / 3–5 ч спокойно',
    altitude:['PR6: 964–1288 м','PR6.1: 1000–1288 м','В связке: примерно 960–1290 м'], elevation:'до 324 м',
    start:'Rabaçal / ER105', maps:'https://maps.google.com/?q=32.75504424930365,-17.133990561042204', waze:'https://waze.com/ul?ll=32.75504424930365%2C-17.133990561042204&navigate=yes',
    booking:'Да, SIMplifica. Лучше брать ранний слот.', price:'€4.50 за маршрут; дети до 12 бесплатно, слот всё равно нужен.',
    terrain:['влажный Laurissilva','узкие levada paths','водопады','местами скользко','людей много'],
    details:'Маршрут идёт по влажному зелёному лесу Laurissilva и levada paths. Местами узко, мокро и скользко, особенно после дождя. Технически несложно, но людей много, поэтому раннее утро сильно лучше. PR6 ведёт к Lagoa das 25 Fontes, PR6.1 — к водопаду Risco. Хорошая связка на полдня.',
    verdict:'Must‑do рядом с Calheta: максимум красоты при умеренной сложности.',
    official:'https://visitmadeira.com/en/what-to-do/nature-seekers/activities/hiking/pr-6-levada-das-25-fontes/',
    image:'https://visitmadeira.com/media/y4flgenv/pr6pr61-levada-das-25fontes-levada-do-risco.jpg', icon:Droplets
  },
  {
    id:'pr62-pr63', order:'02', group:'Близкие красивые', name:'PR6.2 + PR6.3', title:'Levada do Alecrim + Lagoa do Vento',
    short:'Более интересная и менее банальная альтернатива 25 Fontes: левада, виды на долины, вересковые тоннели и водопадная чаша.',
    score:{beauty:9,difficulty:7,distanceFromCalheta:3}, distance:'около 9–11 км в связке', duration:'3–5 ч',
    altitude:['PR6.2: 1256–1339 м','PR6.3: официальный сайт даёт 200–1600 м, похоже на ошибку','Фактически — высокогорная зона Rabaçal'], elevation:'PR6.2: 83 м; Lagoa do Vento добавляет спуск/подъём',
    start:'Rabaçal / ER105 и Casa de Abrigo do Rabaçal', maps:'https://maps.google.com/?q=32.753572621238135,-17.132658815204834', waze:'https://waze.com/ul?ll=32.753572621238135%2C-17.132658815204834&navigate=yes', maps2:'https://maps.google.com/?q=32.75993603465592,-17.121886972313497',
    booking:'Да, SIMplifica.', price:'€4.50 за маршрут; дети до 12 бесплатно, слот всё равно нужен.',
    terrain:['ровная левада','вересковые тоннели','водопадная чаша','спуск/подъём','влажные камни'],
    details:'Alecrim — приятная, сравнительно ровная levada с видами на Rabaçal и Ribeira da Janela. Lagoa do Vento делает маршрут более “трекинговым”: есть спуск к чаше и обратный подъём. Местность влажная, камни могут быть скользкими. По красоте — один из лучших вариантов рядом с Calheta.',
    verdict:'Лучше и менее банально, чем только 25 Fontes.', official:'https://visitmadeira.com/en/what-to-do/nature-seekers/activities/hiking/pr-62-levada-do-alecrim/', image:'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=80', icon:TreePine
  },
  {
    id:'pr19', order:'03', group:'Близкие второстепенные', name:'PR19', title:'Caminho Real do Paul do Mar',
    short:'Короткий, но крутой исторический спуск по старой королевской дороге из Prazeres к океану.',
    score:{beauty:8,difficulty:6,distanceFromCalheta:2}, distance:'1.8 км в одну сторону', duration:'1:20 ч + логистика возврата',
    altitude:['16–550 м'], elevation:'534 м', start:'Prazeres / Lombo da Rocha', maps:'https://maps.google.com/?q=32.75248737105696,-17.217051687162563', waze:'https://waze.com/ul?ll=32.75248737105696%2C-17.217051687162563&navigate=yes',
    booking:'Да, SIMplifica.', price:'€4.50; дети до 12 бесплатно, слот всё равно нужен.', terrain:['открытые виды','каменные ступени','резкий спуск','океан','сельские террасы'],
    details:'Открытая местность, виды на океан, Jardim do Mar и Paul do Mar, сельские террасы. Дорога старая каменная, зигзагами вниз, много ступеней/камней. Главная нагрузка — колени, не дыхалка. Лучше идти сверху вниз и заранее решить, как возвращаться: такси, автобус, вторая машина или обратный подъём.',
    verdict:'Очень логичный из Calheta: океан, история и деревня Paul do Mar.', official:'https://visitmadeira.com/en/what-to-do/nature-seekers/activities/hiking/pr-19-caminho-real-do-paul-do-mar/', image:'https://visitmadeira.com/media/lvzefhin/pr19-caminho-real-do-paul-do-mar.jpg', icon:Waves
  },
  {
    id:'pr13', order:'04', group:'Близкие второстепенные', name:'PR13', title:'Vereda do Fanal',
    short:'Атмосферный маршрут через Laurissilva и плато Paul da Serra. Лучший эффект — в тумане.',
    score:{beauty:8.5,difficulty:5,distanceFromCalheta:4}, distance:'10.8 км линейно', duration:'около 4 ч',
    altitude:['1130–1420 м'], elevation:'290 м', start:'ER209 Assobiadores / Paul da Serra', maps:'https://maps.google.com/?q=32.76711059606755,-17.107713654977086', waze:'https://waze.com/ul?ll=32.76711059606755%2C-17.107713654977086&navigate=yes',
    booking:'Да, SIMplifica.', price:'€4.50; дети до 12 бесплатно, слот всё равно нужен.', terrain:['Laurissilva','туман','мох','корни','линейный маршрут'],
    details:'Это не про драматичные панорамы, а про лес, влажность, туман, старые деревья til и ощущение древней Madeira. Тропа умеренная, но длинная. Местами грязь, корни, влажная земля. Маршрут линейный: старт и финиш разные, поэтому нужна логистика.',
    verdict:'Сказочная лавровая Мадейра, особенно в тумане.', official:'https://visitmadeira.com/en/what-to-do/nature-seekers/activities/hiking/pr-13-vereda-do-fanal/', image:'https://visitmadeira.com/media/bjqe3ggg/pr13-vereda-do-fanal.jpg', icon:TreePine
  },
  {
    id:'pr12', order:'05', group:'Удалённые / горные', name:'PR1.2', title:'Vereda do Pico Ruivo',
    short:'Самый простой и короткий способ подняться на высшую точку Madeira — Pico Ruivo, 1862 м.',
    score:{beauty:9.5,difficulty:6,distanceFromCalheta:7}, distance:'5.6 км туда‑обратно', duration:'1:30–2:30 ч',
    altitude:['Официально указано 1852–1857 м, но это не отражает реальный профиль','Практически: старт около 1590 м, вершина 1862 м'], elevation:'примерно 270 м реального набора', start:'Achada do Teixeira', maps:'https://maps.google.com/?q=32.76481399738595,-16.921079577375384', waze:'https://waze.com/ul?ll=32.76481399738595%2C-16.921079577375384&navigate=yes',
    booking:'Да, SIMplifica.', price:'€4.50; дети до 12 бесплатно, слот всё равно нужен.', terrain:['high‑mountain','каменная тропа','ветер','облака','финальный подъём'],
    details:'High-mountain маршрут без экстремальной техники. Каменная тропа, открытые виды, укрытия от резкой смены погоды, финальный подъём к Pico Ruivo. Погода может резко поменяться: ветер, облака, холод. Хорошая замена, если PR1 целиком закрыт или ограничен.',
    verdict:'Короткий способ взять Pico Ruivo, если PR1 сложен/закрыт.', official:'https://visitmadeira.com/en/what-to-do/nature-seekers/activities/hiking/pr-12-vereda-do-pico-ruivo/', image:'https://visitmadeira.com/media/fxxjsraw/pr12-vereda-do-pico-ruivo.jpg', icon:Mountain
  },
  {
    id:'pr1', order:'06', group:'Удалённые / горные', name:'PR1', title:'Vereda do Areeiro',
    short:'Главный драматичный горный маршрут Madeira: Pico do Areeiro — Pico Ruivo, хребты, обрывы, тоннели, лестницы.',
    score:{beauty:10,difficulty:9,distanceFromCalheta:7}, distance:'6.1–7 км в одну сторону; доступность проверять', duration:'3:30 ч официально, больше с паузами',
    altitude:['1491–1857 м'], elevation:'366 м по max/min; ощущается больше из‑за “пилы”', start:'Pico do Areeiro viewpoint', maps:'https://maps.google.com/?q=32.73549086827481,-16.928797218182066', waze:'https://waze.com/ul?ll=32.73549086827481%2C-16.928797218182066&navigate=yes',
    booking:'Да, SIMplifica. PR1 — отдельный тариф/особые условия, статус проверять особенно внимательно.', price:'До €10.50 за полный PR1; участок до Pedra Rija может быть €4.50.', terrain:['хребет','обрывы','лестницы','тоннели','ветер'],
    details:'Самый зрелищный и самый капризный маршрут. Открытый высокогорный хребет, лестницы, тоннели, крутые склоны, обрывы, ветер и облака. Нужна хорошая погода, обувь, фонарик для тоннелей, вода и запас по времени. Если полный PR1 недоступен — делаем PR1.2.',
    warning:'Важное ограничение: по последней информации маршрут PR1 может быть доступен не полностью — возможно открыт только участок до Pedra Rija. Для поездки 13–21 июля обязательно проверить официальный статус IFCN/Visit Madeira и доступные слоты перед решением идти.',
    verdict:'10/10 по драме и видам, но только при хорошем статусе и погоде.', official:'https://visitmadeira.com/en/what-to-do/nature-seekers/activities/hiking/pr-1-vereda-do-areeiro/', image:'https://visitmadeira.com/media/ldyjqzb2/pr1-vereda-do-areeiro.jpg', icon:Mountain
  },
  {
    id:'pr9', order:'07', group:'Удалённые / лесные', name:'PR9', title:'Levada do Caldeirão Verde',
    short:'Длинная красивая levada через Laurissilva, тоннели и скальные стены к водопаду Caldeirão Verde.',
    score:{beauty:9,difficulty:6,distanceFromCalheta:7}, distance:'17.4 км туда‑обратно', duration:'около 6:30 ч',
    altitude:['872–1020 м'], elevation:'148 м', start:'Queimadas Forest Park', maps:'https://maps.google.com/?q=32.78355662588914,-16.907019203666717', waze:'https://waze.com/ul?ll=32.78355662588914%2C-16.907019203666717&navigate=yes',
    booking:'Да, SIMplifica. Парковка платная.', price:'€4.50; парковка около €2/час.', terrain:['длинная левада','4 тоннеля','фонарик','узко у скал','влажно'],
    details:'Набор высоты небольшой, но маршрут длинный. Много влажного леса, историческая левада XVIII века, узкие проходы у скал, 4 тоннеля — нужен фонарик. Может быть тесно и мокро. Очень красивый, но из Calheta это уже отдельный дальний день.',
    verdict:'Красиво, длинно, с тоннелями; делать отдельным днём.', official:'https://visitmadeira.com/en/what-to-do/nature-seekers/activities/hiking/pr-9-levada-do-caldeirao-verde/', image:'https://visitmadeira.com/media/ulnbwvru/pr9-levada-do-caldeirao-verde.jpg', icon:Droplets
  },
  {
    id:'pr8', order:'08', group:'Удалённые / океан', name:'PR8', title:'Ponta de São Lourenço',
    short:'Совсем другая Madeira: сухой восточный полуостров, вулканические скалы, океан с двух сторон, ветер и открытые виды.',
    score:{beauty:9,difficulty:5,distanceFromCalheta:8}, distance:'6 км туда‑обратно', duration:'2:30 ч',
    altitude:['23–126 м'], elevation:'103 м', start:'Baía d’Abra', maps:'https://maps.google.com/?q=32.74337635200951,-16.700940231938628', waze:'https://waze.com/ul?ll=32.74337635200951%2C-16.700940231938628&navigate=yes',
    booking:'Да, SIMplifica.', price:'€4.50; дети до 12 бесплатно, слот всё равно нужен.', terrain:['сухо','без тени','вулканические скалы','ветер','океан с двух сторон'],
    details:'Открытая сухая местность, почти без деревьев и тени. Тропа хорошая, но волнистая: подъёмы и спуски есть. Ветер может быть сильным, солнце — жёстким, поэтому вода, кепка и защита от солнца обязательны. Лучше утром или ближе к вечеру. Отдельный дальний день из Calheta.',
    verdict:'Визуально другой остров; обязательно, если есть день на восток.', official:'https://visitmadeira.com/en/what-to-do/nature-seekers/activities/hiking/pr-8-vereda-da-ponta-de-sao-lourenco/', image:'https://visitmadeira.com/media/bnpngpg0/pr8-vereda-da-ponta-de-sao-lourenc-o.jpg', icon:Wind
  }
];

function scoreTone(type, value){
  if(type === 'beauty') return 'beauty';
  if(type === 'difficulty') return value <= 3 ? 'easy' : value <= 6 ? 'medium' : 'hard';
  if(type === 'distance') return value <= 3 ? 'easy' : value <= 6 ? 'medium' : 'hard';
  return 'beauty';
}
function ScoreBar({label,value,type='beauty'}){const pct=value*10;return <div className={`score ${scoreTone(type,value)}`}><div className="scoreTop"><span>{label}</span><b>{value}/10</b></div><div className="bar"><i style={{width:`${pct}%`}}/></div></div>}
function RouteCard({r,onImageOpen}){const Icon=r.icon;return <article className="card" id={r.id}>
  <button className="media" type="button" onClick={()=>onImageOpen(r)} aria-label={`Открыть фото ${r.name} ${r.title}`}><img src={r.image} alt={`${r.name} ${r.title}`} loading="lazy" onError={e=>{e.currentTarget.style.display='none'}}/><div className="badge"><Icon size={16}/>{r.group}</div><div className="openPhoto"><Maximize2 size={16}/> открыть фото</div><div className="num">{r.order}</div></button>
  <div className="body"><div className="kicker"><span>{r.name}</span><span>{r.duration}</span></div><h2>{r.title}</h2><p className="short">{r.short}</p>
  <div className="grid3"><ScoreBar label="Красота" value={r.score.beauty} type="beauty"/><ScoreBar label="Сложность" value={r.score.difficulty} type="difficulty"/><ScoreBar label="Удалённость" value={r.score.distanceFromCalheta} type="distance"/></div>
  <div className="facts">
    <div><Route size={18}/><span><b>Длина</b>{r.distance}</span></div><div><Mountain size={18}/><span><b>Высота</b>{r.altitude.join(' · ')}</span></div><div><Gauge size={18}/><span><b>Перепад</b>{r.elevation}</span></div><div><MapPin size={18}/><span><b>Старт</b>{r.start}</span></div>
  </div>
  <div className="links"><a href={r.maps} target="_blank">Google Maps <ExternalLink size={14}/></a><a href={r.waze} target="_blank">Waze <ExternalLink size={14}/></a>{r.maps2&&<a href={r.maps2} target="_blank">2-й старт <ExternalLink size={14}/></a>}<a href={r.official} target="_blank">Official <ExternalLink size={14}/></a></div>
  <div className="chips">{r.terrain.map(x=><span key={x}>{x}</span>)}</div>
  <div className="note"><CalendarCheck size={18}/><div><b>Бронирование</b><p>{r.booking}</p><p className="muted">{r.price}</p></div></div>
  {r.warning&&<div className="warning"><AlertTriangle size={20}/><div><b>Проверить перед выходом</b><p>{r.warning}</p></div></div>}
  <div className="detail"><h3>Подробно</h3><p>{r.details}</p><blockquote>{r.verdict}</blockquote></div>
  </div>
</article>}
function App(){const [q,setQ]=useState(''); const [lightbox,setLightbox]=useState(null); const filtered=useMemo(()=>routes.filter(r=>(r.name+' '+r.title+' '+r.short+' '+r.group).toLowerCase().includes(q.toLowerCase())),[q]);return <>
<header className="hero"><nav><div className="brand"><Compass/> Трекинг на Мадейре</div><a href="#routes">Все маршруты</a></nav><div className="heroGrid"><div><p className="eyebrow">Calheta base · family-readable guide</p><h1>Трекинг на Мадейре. Гид Ивана.</h1><p className="lead">Порядок по удобству из Calheta, скоринг, высоты, перепады, стартовые точки, бронирование и характер тропы.</p><div className="heroActions"><a href="#routes" className="primary">Смотреть маршруты</a><a href="https://simplifica.madeira.gov.pt/services/78-82-259" target="_blank" className="secondary">SIMplifica</a></div></div><div className="panel"><div className="panelTop"><Star/><span>Рекомендованный порядок</span></div>{routes.slice(0,5).map(r=><a key={r.id} href={`#${r.id}`}><b>{r.order}</b><span>{r.name}</span><em>{r.score.beauty}/10</em></a>)}</div></div></header>
<section className="summary"><div><ShieldAlert/><h3>Общее правило</h3><p>Для classified PR-маршрутов Madeira бронирование слота через SIMplifica обязательно. Льгота резидента — именно для Madeira, не материковой Португалии.</p></div><div><Sun/><h3>Когда идти</h3><p>Лучше раннее утро: меньше людей, мягче свет и ниже риск жары/ветра. Для PR1/PR1.2 сначала проверять статус и погоду.</p></div><div><Car/><h3>Логистика</h3><p>Линейные маршруты вроде PR13 и PR19 требуют заранее решить возврат: такси, автобус, вторая машина или обратный путь.</p></div></section>
<main id="routes"><div className="toolbar"><h2>Полный список</h2><label><Search size={18}/><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Найти маршрут…"/></label></div><div className="routeList">{filtered.map(r=><RouteCard key={r.id} r={r} onImageOpen={setLightbox}/>)}</div></main>
{lightbox&&<div className="lightbox" role="dialog" aria-modal="true" onClick={()=>setLightbox(null)}><button className="lightboxClose" type="button" onClick={()=>setLightbox(null)} aria-label="Закрыть"><X size={22}/></button><figure onClick={e=>e.stopPropagation()}><img src={lightbox.image} alt={`${lightbox.name} ${lightbox.title}`}/><figcaption>{lightbox.name} — {lightbox.title}</figcaption></figure></div>}
<footer><p>Собрано для Ивана · данные структурированы из обсуждения с гидом и официальных страниц Visit Madeira / IFCN. Перед выходом проверять актуальный статус маршрута.</p></footer>
</>}

createRoot(document.getElementById('root')).render(<App/>);
