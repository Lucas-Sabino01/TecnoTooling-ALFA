"use client"

import { useState } from "react"
import { DollarSign, AlertTriangle, Package, Truck, Plus, Minus, Search, Tag } from "lucide-react"
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"
import Sidebar from "@/components/layouts/Sidebar"
import "./dashboard.css"

const stockByCategory = [
  { name: "Matéria-Prima", value: 450000 },
  { name: "Produtos Fastil", value: 180000 },
  { name: "Componentes", value: 120000 },
  { name: "Consumíveis/EPIs", value: 98000 },
]

const entriesVsExits = [
  { month: "Jan", entradas: 120000, saidas: 80000 },
  { month: "Fev", entradas: 150000, saidas: 95000 },
  { month: "Mar", entradas: 180000, saidas: 110000 },
  { month: "Abr", entradas: 160000, saidas: 125000 },
  { month: "Mai", entradas: 200000, saidas: 140000 },
  { month: "Jun", entradas: 175000, saidas: 130000 },
]

const criticalItems = [
  { codigo: "MT-001", descricao: "Aço Carbono 1020", atual: 5, minimo: 20 },
  { codigo: "EP-045", descricao: "Capacete de Segurança", atual: 8, minimo: 15 },
  { codigo: "CP-123", descricao: "Rolamento 6205", atual: 2, minimo: 10 },
]

const expiringItems = [
  { item: "Cola de Contato", lote: "Lote 5524", vencimento: "20/09/2025" },
  { item: "Tinta Anticorrosiva", lote: "Lote 7891", vencimento: "15/10/2025" },
]

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="dashboard-container">
      <Sidebar className="lg:block" isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="main-content">

        {/* Main Content - Two Columns */}
        <main className="main-content-area">
          {/* KPI Cards */}
          <div className="kpi-grid">
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Valor Total do Estoque</h3>
                <DollarSign className="kpi-icon primary" />
              </div>
              <div className="card-content">
                <div className="kpi-value">R$ 848.320,55</div>
                <p className="kpi-description">Capital imobilizado no almoxarifado</p>
              </div>
            </div>

            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Itens Abaixo do Mínimo</h3>
                <AlertTriangle className="kpi-icon critical" />
              </div>
              <div className="card-content">
                <div className="kpi-value critical">18</div>
                <p className="kpi-description">Ações de compra necessárias</p>
              </div>
            </div>

            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Total de Itens Cadastrados</h3>
                <Package className="kpi-icon primary" />
              </div>
              <div className="card-content">
                <div className="kpi-value">1.250</div>
                <p className="kpi-description">SKUs ativos no sistema</p>
              </div>
            </div>

            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Recebimentos (7 dias)</h3>
                <Truck className="kpi-icon primary" />
              </div>
              <div className="card-content">
                <div className="kpi-value">42 notas fiscais</div>
                <p className="kpi-description">Entradas registradas na última semana</p>
              </div>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="action-buttons-grid">
            <button className="action-button primary">
              <Plus className="button-icon" />
              Registrar Entrada (NF)
            </button>
            <button className="action-button destructive">
              <Minus className="button-icon" />
              Registrar Saída (Requisição)
            </button>
            <button className="action-button secondary">
              <Search className="button-icon" />
              Consultar Item
            </button>
            <button className="action-button secondary">
              <Tag className="button-icon" />
              Cadastrar Novo Item
            </button>
          </div>

          {/* Main Content - Two Columns */}
          <div className="content-grid">
            {/* Left Column - Charts */}
            <div className="charts-column">
              {/* Stock by Category Chart */}
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title" style={{ color: "#1f2937", fontSize: "1rem", fontWeight: "600" }}>
                    Estoque por Categoria (Valor)
                  </h3>
                </div>
                <div className="card-content">
                  <div className="chart-container">
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={stockByCategory}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#6b7280" }} />
                        <YAxis
                          tick={{ fontSize: 12, fill: "#6b7280" }}
                          tickFormatter={(value) => `R$ ${(value / 1000).toFixed(0)}k`}
                        />
                        <Tooltip
                          formatter={(value) => [`R$ ${value.toLocaleString("pt-BR")}`, "Valor"]}
                          labelStyle={{ color: "#1f2937" }}
                          contentStyle={{
                            backgroundColor: "#ffffff",
                            border: "1px solid #e5e7eb",
                            borderRadius: "6px",
                          }}
                        />
                        <Bar dataKey="value" fill="#005A9C" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {/* Entries vs Exits Chart */}
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title" style={{ color: "#1f2937", fontSize: "1rem", fontWeight: "600" }}>
                    Entradas vs. Saídas (Últimos 30 dias)
                  </h3>
                </div>
                <div className="card-content">
                  <div className="chart-container">
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={entriesVsExits}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#6b7280" }} />
                        <YAxis
                          tick={{ fontSize: 12, fill: "#6b7280" }}
                          tickFormatter={(value) => `R$ ${(value / 1000).toFixed(0)}k`}
                        />
                        <Tooltip
                          formatter={(value, name) => [
                            `R$ ${value.toLocaleString("pt-BR")}`,
                            name === "entradas" ? "Entradas" : "Saídas",
                          ]}
                          labelStyle={{ color: "#1f2937" }}
                          contentStyle={{
                            backgroundColor: "#ffffff",
                            border: "1px solid #e5e7eb",
                            borderRadius: "6px",
                          }}
                        />
                        <Line
                          type="monotone"
                          dataKey="entradas"
                          stroke="#10b981"
                          strokeWidth={2}
                          dot={{ fill: "#10b981", strokeWidth: 2, r: 4 }}
                        />
                        <Line
                          type="monotone"
                          dataKey="saidas"
                          stroke="#dc2626"
                          strokeWidth={2}
                          dot={{ fill: "#dc2626", strokeWidth: 2, r: 4 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Alerts */}
            <div className="alerts-column">
              {/* Critical Items Alert */}
              <div className="card alert-card">
                <div className="card-header">
                  <h3 className="alert-title">
                    <AlertTriangle className="alert-icon" />
                    Itens Críticos (Abaixo do Estoque Mínimo)
                  </h3>
                </div>
                <div className="card-content">
                  <div>
                    <div className="table-header">
                      <div>Código</div>
                      <div>Descrição</div>
                      <div>Atual</div>
                      <div>Mínimo</div>
                    </div>
                    {criticalItems.map((item, index) => (
                      <div key={index} className="table-row">
                        <div className="table-cell code">{item.codigo}</div>
                        <div className="table-cell" title={item.descricao}>
                          {item.descricao}
                        </div>
                        <div className="table-cell critical">{item.atual}</div>
                        <div className="table-cell">{item.minimo}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Expiring Items Alert */}
              <div className="card alert-card warning">
                <div className="card-header">
                  <h3 className="alert-title warning">
                    <AlertTriangle className="alert-icon" />
                    Alerta de Validade (Vencimento em 30 dias)
                  </h3>
                </div>
                <div className="card-content">
                  <div>
                    <div className="table-header three-cols">
                      <div>Item</div>
                      <div>Lote</div>
                      <div>Data de Vencimento</div>
                    </div>
                    {expiringItems.map((item, index) => (
                      <div key={index} className="table-row three-cols">
                        <div className="table-cell">{item.item}</div>
                        <div className="table-cell code">{item.lote}</div>
                        <div className="table-cell warning">{item.vencimento}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
