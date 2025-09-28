# 🌦️ Angola Weather API  

API robusta para consulta de dados meteorológicos das principais localidades de Angola.  
Construída para **desempenho, escalabilidade e confiabilidade**, utilizando tecnologias modernas.

---

## 🚀 Tecnologias Utilizadas  

<p align="left">
  <a href="https://nodejs.org/">
    <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js"/>
  </a>
  <a href="https://www.typescriptlang.org/">
    <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"/>
  </a>
  <a href="https://expressjs.com/">
    <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express.js"/>
  </a>
  <a href="https://www.prisma.io/">
    <img src="https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white" alt="Prisma"/>
  </a>
  <a href="https://www.postgresql.org/">
    <img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL"/>
  </a>
  <a href="https://redis.io/">
    <img src="https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white" alt="Redis"/>
  </a>
  <a href="https://openweathermap.org/api">
    <img src="https://img.shields.io/badge/OpenWeather-FF6600?style=for-the-badge&logo=openweathermap&logoColor=white" alt="OpenWeather API"/>
  </a>
</p>

---

## 📖 Funcionalidades  

✨ A **Angola Weather API** oferece recursos completos para consulta meteorológica com foco em **confiabilidade, desempenho e usabilidade**:

- 🌍 **Clima em Tempo Real** → Consulte as condições meteorológicas actuais de qualquer localidade disponível.  
- 📍 **Listagem de Localidades** → Explore todas as localidades de Angola com suporte a **paginação** e **filtros por província**.  
- ⚡ **Alta Performance** → Respostas rápidas com **cache inteligente** utilizando Redis.  
- 📊 **Dados Confiáveis** → Informações meteorológicas provenientes de **provedores de alta precisão**.  
- 🔄 **Flexibilidade** → Suporte a unidades métricas (°C, km/h, %), ideais para relatórios e aplicações locais.  

---

## 📡 Endpoints Principais  

A API segue o padrão **RESTful**, com respostas consistentes em JSON.

### 🔹 Localidades  

- **`GET /localidade`** → Retorna a lista de localidades disponíveis.  
  - 🔎 **Filtros suportados**:  
    - `provincia` → Localidades por província  
    - `page` e `limit` → Paginação de resultados  

- **`GET /localidade/{id}`** → Retorna os detalhes completos de uma localidade pelo **ID**.  

### 🔹 Clima  

- **`GET /clima/{localidade}`** → Retorna o **clima actual** de uma localidade pelo **nome**.  
  - Inclui: temperatura, sensação térmica, humidade relativa, descrição do tempo e metadados (unidades).  

---


## 🔧 Instalação e Configuração  

### 1️⃣ Clone o repositório  
```bash
git clone https://github.com/seu-usuario/angola-weather-api.git
cd angola-weather-api
