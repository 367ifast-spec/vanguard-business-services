CREATE TABLE seller_subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    seller_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,

    package_id UUID NOT NULL REFERENCES seller_packages(id),

    status VARCHAR(20) NOT NULL DEFAULT 'active',

    started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    expires_at TIMESTAMPTZ,

    payment_id UUID,

    amount_paid NUMERIC(10,2) NOT NULL DEFAULT 0,

    auto_renew BOOLEAN NOT NULL DEFAULT FALSE,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_seller_subscriptions_seller_id
ON seller_subscriptions(seller_id);

CREATE INDEX idx_seller_subscriptions_package_id
ON seller_subscriptions(package_id);