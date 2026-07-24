CREATE TABLE seller_badges (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    seller_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,

    badge_name VARCHAR(50) NOT NULL,
    badge_slug VARCHAR(50) NOT NULL,

    badge_icon TEXT,

    is_active BOOLEAN NOT NULL DEFAULT TRUE,

    awarded_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_seller_badges_seller_id
ON seller_badges(seller_id);