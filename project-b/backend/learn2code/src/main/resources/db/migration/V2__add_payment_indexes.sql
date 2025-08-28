-- add a couple of helpful indexes (no-op if they already exist)
CREATE INDEX IF NOT EXISTS idx_payments_enrollment_id ON payments(enrollment_id);
CREATE INDEX IF NOT EXISTS idx_payments_created_at    ON payments(created_at);
