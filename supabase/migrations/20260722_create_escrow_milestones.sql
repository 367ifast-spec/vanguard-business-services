CREATE TABLE escrow_milestones (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    escrow_id UUID NOT NULL
        REFERENCES escrow_transactions(id)
        ON DELETE CASCADE,

    title VARCHAR(255) NOT NULL,
    description TEXT,

    amount NUMERIC(10,2) NOT NULL,

    status VARCHAR(50) NOT NULL DEFAULT 'pending',

    completed_at TIMESTAMPTZ,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_escrow_milestones_escrow_id
ON escrow_milestones(escrow_id);