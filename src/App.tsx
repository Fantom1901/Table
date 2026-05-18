import { useState } from "react";
import { useReactTable, getCoreRowModel, flexRender, createColumnHelper } from "@tanstack/react-table";
import { Hotel, MapPin, BedDouble, DollarSign, TableProperties, HelpCircle, BookOpen } from "lucide-react";

// === ЗАДАНИЕ 1: ДАННЫЕ ГОСТИНИЦ ===
type HotelRow = { name: string; address: string; roomType: string; price: number; rowSpanName?: number; rowSpanAddress?: number; };
const hotelData: HotelRow[] = [
  { name: "«Кедр»", address: "ул. 60 лет ВЛКСМ, 5", roomType: "Одноместный", price: 300, rowSpanName: 3, rowSpanAddress: 3 },
  { name: "«Кедр»", address: "ул. 60 лет ВЛКСМ, 5", roomType: "Люкс одноместный", price: 400 },
  { name: "«Кедр»", address: "ул. 60 лет ВЛКСМ, 5", roomType: "Двухместный", price: 500 },
  { name: "«Созвездие медведицы»", address: "ул. Магистральная, 50", roomType: "Одноместный", price: 250, rowSpanName: 2, rowSpanAddress: 2 },
  { name: "«Созвездие медведицы»", address: "ул. Магистральная, 50", roomType: "Двухместный", price: 450 },
  { name: "«Виталина»", address: "5 микрорайон, 1 А", roomType: "Четырехместный", price: 600, rowSpanName: 1, rowSpanAddress: 1 }
];

const hotelHelper = createColumnHelper<HotelRow>();
const hotelColumns = [
  hotelHelper.accessor("name", { header: () => <span className="flex items-center gap-2"><Hotel size={16}/> Название</span>, cell: info => info.getValue() }),
  hotelHelper.accessor("address", { header: () => <span className="flex items-center gap-2"><MapPin size={16}/> Адрес</span>, cell: info => info.getValue() }),
  hotelHelper.accessor("roomType", { header: () => <span className="flex items-center gap-2"><BedDouble size={16}/> Тип номера</span>, cell: info => info.getValue() }),
  hotelHelper.accessor("price", { header: () => <span className="flex items-center gap-2"><DollarSign size={16}/> Цена за сутки</span>, cell: info => `${info.getValue()} руб.` })
];

// === ЗАДАНИЕ 2: САМОСТОЯТЕЛЬНАЯ РАБОТА (Таблица 5x5) ===
type CustomRow = { col1: string; col2: string; col3: string; col4: string; col5: string; colSpanId?: string; };
const customData: CustomRow[] = [
  { col1: "Панель управления", col2: "Мониторинг", col3: "Логи", col4: "Бэкапы", col5: "Статус", colSpanId: "row1" },
  { col1: "Сервер Альфа", col2: "CPU: 12%", col3: "RAM: 45%", col4: "SSD: 23%", col5: "Online" },
  { col1: "Сервер Бета", col2: "CPU: 88%", col3: "RAM: 92%", col4: "SSD: 78%", col5: "Warning" },
  { col1: "Итоговая статистика системных ресурсов кластера", col2: "", col3: "", col4: "", col5: "Стабильно", colSpanId: "row4" },
  { col1: "Сервер Гамма", col2: "CPU: 4%", col3: "RAM: 12%", col4: "SSD: 5%", col5: "Idle" }
];

const customHelper = createColumnHelper<CustomRow>();
const customColumns = [
  customHelper.accessor("col1", { header: "Узел / Ресурс" }),
  customHelper.accessor("col2", { header: "Метрика 1" }),
  customHelper.accessor("col3", { header: "Метрика 2" }),
  customHelper.accessor("col4", { header: "Метрика 3" }),
  customHelper.accessor("col5", { header: "Состояние" })
];

export default function App() {
  const [activeTab, setActiveTab] = useState<"hotels" | "custom" | "questions">("hotels");

  const hotelTable = useReactTable({ data: hotelData, columns: hotelColumns, getCoreRowModel: getCoreRowModel() });
  const customTable = useReactTable({ data: customData, columns: customColumns, getCoreRowModel: getCoreRowModel() });

  return (
    <div className="max-w-4xl mx-auto">
      {/* Навигация Material You вайб */}
      <div className="flex gap-2 p-1.5 bg-slate-100 rounded-2xl mb-8 w-fit">
        <button onClick={() => setActiveTab("hotels")} className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${activeTab === "hotels" ? "bg-white text-slate-900 shadow-sm" : "text-slate-600 hover:text-slate-900"}`}>
          <Hotel size={16}/> Гостиницы
        </button>
        <button onClick={() => setActiveTab("custom")} className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${activeTab === "custom" ? "bg-white text-slate-900 shadow-sm" : "text-slate-600 hover:text-slate-900"}`}>
          <TableProperties size={16}/> Самостоятельная
        </button>
        <button onClick={() => setActiveTab("questions")} className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${activeTab === "questions" ? "bg-white text-slate-900 shadow-sm" : "text-slate-600 hover:text-slate-900"}`}>
          <HelpCircle size={16}/> Контрольные вопросы
        </button>
      </div>

      {/* Контент */}
      {activeTab === "hotels" && (
        <div className="bg-white/70 backdrop-blur-md p-6 rounded-3xl shadow-sm border border-slate-100">
          <h2 className="text-2xl font-semibold text-slate-800 mb-6 tracking-tight">Характеристики гостиниц (Задание 1)</h2>
          <div className="overflow-hidden rounded-2xl border border-slate-100">
            <table className="w-full border-collapse text-left text-sm text-slate-600">
              <thead className="bg-slate-50/75 text-slate-700 border-b border-slate-100">
                {hotelTable.getHeaderGroups().map(hg => (
                  <tr key={hg.id}>
                    {hg.headers.map(h => <th key={h.id} className="p-4 font-semibold text-slate-900">{flexRender(h.column.columnDef.header, h.getContext())}</th>)}
                  </tr>
                ))}
              </thead>
              <tbody>
                {hotelTable.getRowModel().rows.map(row => (
                  <tr key={row.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                    {row.getVisibleCells().map(cell => {
                      const id = cell.column.id; const orig = row.original;
                      if (id === "name") return orig.rowSpanName ? <td key={cell.id} rowSpan={orig.rowSpanName} className="p-4 font-medium text-slate-900 bg-slate-100/20 align-top border-r border-slate-50">{flexRender(cell.column.columnDef.cell, cell.getContext())}</td> : null;
                      if (id === "address") return orig.rowSpanAddress ? <td key={cell.id} rowSpan={orig.rowSpanAddress} className="p-4 text-slate-500 align-top border-r border-slate-50">{flexRender(cell.column.columnDef.cell, cell.getContext())}</td> : null;
                      return <td key={cell.id} className={`p-4 ${id === "price" ? "font-mono text-emerald-600 text-right" : ""}`}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>;
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === "custom" && (
        <div className="bg-white/70 backdrop-blur-md p-6 rounded-3xl shadow-sm border border-slate-100">
          <h2 className="text-2xl font-semibold text-slate-800 mb-2 tracking-tight">Мониторинг кластера (Задание 2)</h2>
          <p className="text-xs text-slate-400 mb-6">Использованы новые атрибуты: <code className="bg-slate-100 px-1 py-0.5 rounded">colSpan</code> для слияния горизонталей, кастомные акцентные заливки строк состояния, и условное форматирование критических зон.</p>
          <div className="overflow-hidden rounded-2xl border border-slate-100">
            <table className="w-full border-collapse text-left text-sm text-slate-600">
              <thead className="bg-slate-800 text-white border-b border-slate-900">
                {customTable.getHeaderGroups().map(hg => (
                  <tr key={hg.id}>
                    {hg.headers.map(h => <th key={h.id} className="p-4 font-medium">{flexRender(h.column.columnDef.header, h.getContext())}</th>)}
                  </tr>
                ))}
              </thead>
              <tbody>
                {customTable.getRowModel().rows.map(row => {
                  const orig = row.original;
                  return (
                    <tr key={row.id} className={`border-b border-slate-100 transition-colors ${orig.col5 === "Warning" ? "bg-amber-50/50" : ""}`}>
                      {row.getVisibleCells().map(cell => {
                        if (orig.colSpanId === "row1" && cell.column.id === "col1") return <td key={cell.id} colSpan={5} className="p-4 font-semibold text-center bg-indigo-50/50 text-indigo-900 border-b border-indigo-100">⚡ {orig.col1}</td>;
                        if (orig.colSpanId === "row4" && cell.column.id === "col1") return <td key={cell.id} colSpan={4} className="p-4 font-medium italic text-slate-500 bg-slate-50">{orig.col1}</td>;
                        if ((orig.colSpanId === "row1" || orig.colSpanId === "row4") && cell.column.id !== "col1" && cell.column.id !== "col5") return null;
                        
                        return (
                          <td key={cell.id} className={`p-4 ${cell.column.id === "col5" ? orig.col5 === "Online" ? "text-emerald-600 font-medium" : orig.col5 === "Warning" ? "text-amber-600 font-bold animate-pulse" : "text-slate-400" : ""}`}>
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === "questions" && (
        <div className="bg-white/70 backdrop-blur-md p-6 rounded-3xl shadow-sm border border-slate-100">
          <h2 className="text-2xl font-semibold text-slate-800 mb-6 tracking-tight">Ответы на контрольные вопросы</h2>
          <div className="space-y-4">
            {[
              { q: "Какой тег является тегом-контейнером таблицы?", a: "Тег <table> ... </table>." },
              { q: "Чем отличаются теги <th> и <td>?", a: "<th> используется для заголовков ячеек (текст по умолчанию жирный и центрированный), а <td> — для обычных ячеек с данными." },
              { q: "Как добавить название таблицы?", a: "С помощью тега <caption>, который вставляется сразу после открывающего тега <table>." },
              { q: "Какими атрибутами обладает тег <table>?", a: "В старом HTML4/XHTML: border, width, align, bgcolor, bordercolor, cellspacing, cellpadding. В современном веб-стандарте все они заменены на CSS-свойства (border-collapse, padding, background-color, width, margin)." },
              { q: "Как объединить ячейки одного столбца или строки?", a: "Для объединения по вертикали (строк) используется атрибут rowspan, для объединения по горизонтали (столбцов) — атрибут colspan." },
              { q: "Как выровнять содержимое ячеек в HTML-документе?", a: "Раньше использовались атрибуты align (по горизонтали) и valign (по вертикали). Сейчас это делается через CSS: text-align: center/left/right и vertical-align: top/middle/bottom." }
            ].map((item, idx) => (
              <div key={idx} className="p-4 bg-slate-50 rounded-2xl border border-slate-100/50">
                <h4 className="font-medium text-slate-900 mb-1 flex gap-2"><BookOpen size={18} className="text-indigo-500 mt-0.5"/> {item.q}</h4>
                <p className="text-slate-600 text-sm ml-7">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
