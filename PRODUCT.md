# Paylune / Vault — Personal Banking App

## What It Is
Vault (branded as Paylune) is a clean, modern personal banking application built around the four things users actually need every day: checking their balance, managing their payment cards, reviewing recent transactions, and understanding their spending through analytics. Every design decision prioritizes instant clarity over complexity.

## Users
- **Primary — Everyday Bankers (ages 22–42)**: People who open their banking app multiple times a week expecting instant answers. They want to know their balance and see recent spending in seconds — no menus, no friction.
- **Secondary — Spending-Conscious Users**: People who actively track their financial habits and want clean, visual analytics to guide smarter money decisions.

## Positioning
Vault is the banking app that respects your time. Where traditional banking apps bury essential information behind cluttered menus and confusing interfaces, Vault surfaces what matters — instantly. It does four things, and it does them beautifully.

## Brand & Tone
- **Brand name**: Vault (Paylune)
- **Feel**: Calm, trustworthy, premium, modern. Editorial typography, generous whitespace, confident visual hierarchy.
- **Tone**: Direct, clear, and supportive. No financial jargon. No anxiety-inducing design. Honest about money.
- **Primary color**: Deep navy (#1a3a5c / #0f172a)
- **Accent color**: Royal blue (#2563eb) — used for interactive highlights and key UI emphasis
- **Supporting accent**: Green (#22c55e) — signals positive financial indicators and confirmations
- **Background**: White (#ffffff) / soft off-white (#f8fafc)

## Core Features

### 1. Balance Overview (Primary/Home Screen)
- Account balance displayed **prominently** at the top of the home screen — large, bold, instantly readable
- Sub-balance breakdown: Available balance, Pending, Savings
- Quick action buttons: Send, Receive, Pay, Top Up
- Greeting with user's name
- Notification bell
- Realistic mock data: main balance ~$12,450.80, savings ~$3,200.00

### 2. Card Management
- Visual card display — styled like a real debit/credit card with gradient background, card number (masked), expiry, cardholder name
- Multiple cards: one primary debit card, one credit card
- Freeze / Unfreeze toggle with smooth state change and visual feedback
- Card details section: spending limit, available credit, billing cycle
- "Add new card" affordance

### 3. Recent Transactions
- Chronological feed of recent activity
- Each row: merchant icon/emoji, merchant name, category tag, amount (positive = income green, negative = expense), date
- Category filtering tabs: All, Food, Transport, Shopping, Subscriptions
- At least 15 realistic mock transactions including: Spotify, Netflix, Uber, Amazon, Whole Foods, Starbucks, Apple, Airbnb, Shell Gas, Salary Deposit, etc.
- Search bar at top

### 4. Spending Analytics
- Visual donut/pie chart showing spending by category for current month
- Bar chart comparing this month vs. last month spending by week
- Category breakdown list with amounts and percentage of total spend
- Period selector: This Week / This Month / Last 3 Months
- Total spend summary, biggest spend category callout
- Realistic mock spending: Food $420, Transport $180, Shopping $650, Subscriptions $95, Entertainment $140, Health $75

## Navigation
- Bottom tab bar with 4 tabs: Home, Cards, Transactions, Analytics
- Active tab uses royal blue accent
- Smooth transitions between screens

## Scope
- Mobile-first progressive web app (PWA), rendered in a phone-sized viewport
- Consumer-facing personal banking — not a business banking tool
- Fully functional with realistic mock data — no real API calls needed
- Out of scope for this version: money transfers, bill payments, savings goals, investment tools, lending

## Strategic Principles
1. **Clarity first** — Every screen is immediately legible. If it takes more than a glance, simplify it.
2. **Minimal friction** — The most common actions (check balance, view transactions) require the fewest steps.
3. **Trust through design** — Visual consistency, calm colors, and honest data presentation build user confidence.
4. **Progressive depth** — Critical information surfaces first; analytics and detail are one tap deeper.
