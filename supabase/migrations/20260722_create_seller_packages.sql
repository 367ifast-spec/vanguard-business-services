CREATE TABLE seller_packages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    name VARCHAR(50) NOT NULL UNIQUE,
    slug VARCHAR(50) NOT NULL UNIQUE,

    price_usd NUMERIC(10,2) NOT NULL DEFAULT 0,

    listing_limit INTEGER,
    is_unlimited BOOLEAN NOT NULL DEFAULT FALSE,

    badge_name VARCHAR(50),
    description TEXT,

    is_active BOOLEAN NOT NULL DEFAULT TRUE,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

INSERT INTO seller_packages (
    name,
    slug,
    price_usd,
    listing_limit,
    is_unlimited,
    badge_name,
    description
)
VALUES
(
    'FREE',
    'free',
    0,
    15,
    FALSE,
    'Free Seller',
    'Perfect for new sellers getting started.'
),
(
    'VERIFIED',
    'verified',
    10,
    50,
    FALSE,
    'Verified Seller',
    'Verified sellers with increased listing capacity.'
),
(
    'BRONZE',
    'bronze',
    20,
    100,
    FALSE,
    'Bronze Seller',
    'Ideal for growing digital asset businesses.'
),
(
    'SILVER',
    'silver',
    35,
    250,
    FALSE,
    'Silver Seller',
    'Designed for active marketplace sellers.'
),
(
    'GOLD',
    'gold',
    50,
    500,
    FALSE,
    'Gold Seller',
    'Advanced package for high-volume sellers.'
),
(
    'PLATINUM',
    'platinum',
    75,
    1000,
    FALSE,
    'Platinum Seller',
    'Enterprise-level package for established sellers.'
),
(
    'DIAMOND',
    'diamond',
    100,
    NULL,
    TRUE,
    'Diamond Seller',
    'Unlimited listings with premium marketplace status.'
);