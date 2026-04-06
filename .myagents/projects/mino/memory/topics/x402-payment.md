# x402 付费服务架构

## 核心概念

x402 是基于 intent mandate 的支付协议，允许 AI Agent 自主支付 API 费用。

**标准流程（用户视角）：**
```
1. 调用 API → 返回 HTTP 402 + 收款信息
2. 创建 intent mandate（用户签名）
3. 发起 x402 payment
4. 拿到 X-Payment header 重试 → 获取数据
```

## 关键字段

| 字段 | 说明 |
|------|------|
| `payTo` | 收款钱包地址 |
| `amount` | 金额（USDC 等 6 位小数，最小单位） |
| `host` | API 服务地址 |
| `resource` | 具体接口路径 |
| `mandateId` | 用户签署的授权 ID |
| `X-Payment` | 支付凭证，拿到后重试原请求 |

## 提供付费服务

**部署自己的 x402 API：**
1. 部署 API 到 Cloudflare Workers / 任何服务器
2. 返回 402 时附带支付信息
3. 用户支付后凭 X-Payment header 重试
4. 钱直接打到你的钱包地址

**参考实现仓库：**
- fluxapay 官方 SDK
- x402 官方文档

## 相关记忆

- FluxA Agent Wallet：钱包 + agent ID 体系
- AgentHansa：实际应用案例

## 状态

2026-04-06 建立