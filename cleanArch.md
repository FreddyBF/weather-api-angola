com.suaempresa.seuprojeto/
│
├── domain/                  # O CORAÇÃO DA APLICAÇÃO - Regras de negócio puras
│   ├── shared/              # Elementos compartilhados por todo o domínio (ex: BaseEntity, DomainEvent)
│   │   └── DomainEvent.java
│   ├── product/
│   │   ├── Product.java     # Entidade
│   │   ├── ProductPrice.java  # Objeto de Valor (Value Object)
│   │   └── ProductRepository.java # INTERFACE do repositório (o contrato)
│   └── order/
│       ├── Order.java
│       ├── OrderItem.java
│       ├── OrderStatus.java
│       └── OrderRepository.java # INTERFACE
│
├── application/             # A LÓGICA DA APLICAÇÃO - Casos de Uso
│   ├── product/
│   │   ├── create/
│   │   │   ├── CreateProductUseCase.java
│   │   │   ├── CreateProductCommand.java  # DTO de entrada
│   │   │   └── CreateProductResponse.java # DTO de saída
│   │   └── get/
│   │       └── GetProductByIdUseCase.java
│   └── order/
│       ├── place/
│       │   └── PlaceOrderUseCase.java
│       └── ports/             # Portas (interfaces) para serviços externos que a aplicação precisa
│           └── PaymentGateway.java # INTERFACE
│
├── infrastructure/          # OS DETALHES - Implementações de tecnologia
│   ├── database/
│   │   ├── jpa/
│   │   │   ├── product/
│   │   │   │   └── JpaProductRepositoryImpl.java # IMPLEMENTAÇÃO da interface do domínio
│   │   │   └── order/
│   │   │       └── JpaOrderRepositoryImpl.java
│   │   └── migrations/
│   ├── messaging/
│   │   └── RabbitMQOrderEventPublisher.java
│   ├── payment/
│   │   └── StripePaymentGatewayImpl.java # IMPLEMENTAÇÃO da interface da aplicação
│   └── config/
│       └── DependencyInjectionConfig.java # Configuração de Injeção de Dependência (Spring, etc.)
│
└── presentation/            # O PONTO DE ENTRADA - API, CLI, etc.
    ├── api/                 # Para uma API REST
    │   ├── product/
    │   │   ├── ProductController.java
    │   │   └── ProductMapper.java   # Mapeia DTOs da API para Comandos/DTOs da aplicação
    │   └── order/
    │       └── OrderController.java
    └── cli/                   # Para uma interface de linha de comando
        └── CreateProductCliCommand.java