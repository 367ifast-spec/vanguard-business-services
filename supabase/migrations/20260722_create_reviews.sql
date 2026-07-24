CREATE TABLE reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    seller_id UUID NOT NULL
        REFERENCES auth.users(id),

    buyer_id UUID NOT NULL
        REFERENCES auth.users(id),

    escrow_id UUID
        REFERENCES escrow_transactions(id),

    title VARCHAR(255) NOT NULL,

    review TEXT NOT NULL,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_reviews_seller_id
ON reviews(seller_id);

CREATE INDEX idx_reviews_buyer_id
ON reviews(buyer_id);

CREATE INDEX idx_reviews_escrow_id
ON reviews(escrow_id);