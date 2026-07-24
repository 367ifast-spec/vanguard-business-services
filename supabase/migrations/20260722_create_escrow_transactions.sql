CREATE TABLE escrow_transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    buyer_id UUID NOT NULL REFERENCES auth.users(id),
    seller_id UUID NOT NULL REFERENCES auth.users(id),

    listing_id UUID NOT NULL REFERENCES marketplace_listings(id),

    amount NUMERIC(10,2) NOT NULL,

    buyer_fee NUMERIC(10,2) NOT NULL,
    seller_fee NUMERIC(10,2) NOT NULL,
    total_fee NUMERIC(10,2) NOT NULL,

    status VARCHAR(50) NOT NULL DEFAULT 'pending',

    payment_id UUID,

    funded_at TIMESTAMPTZ,
    delivered_at TIMESTAMPTZ,
    released_at TIMESTAMPTZ,
    disputed_at TIMESTAMPTZ,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_escrow_buyer
ON escrow_transactions(buyer_id);

CREATE INDEX idx_escrow_seller
ON escrow_transactions(seller_id);

CREATE INDEX idx_escrow_listing
ON escrow_transactions(listing_id);