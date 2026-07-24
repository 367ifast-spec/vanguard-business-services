CREATE TABLE seller_verifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    seller_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,

    email_verified BOOLEAN NOT NULL DEFAULT FALSE,

    kyc_status VARCHAR(20) NOT NULL DEFAULT 'pending',
    kyc_document_url TEXT,

    admin_approved BOOLEAN NOT NULL DEFAULT FALSE,

    approved_by UUID REFERENCES auth.users(id),
    approved_at TIMESTAMPTZ,

    rejection_reason TEXT,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE UNIQUE INDEX idx_seller_verifications_seller_id
ON seller_verifications(seller_id);