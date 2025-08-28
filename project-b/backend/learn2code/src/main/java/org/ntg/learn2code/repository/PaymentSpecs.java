package org.ntg.learn2code.repository;

import org.ntg.learn2code.model.Payment;
import org.springframework.data.jpa.domain.Specification;

import java.time.LocalDate;

public final class PaymentSpecs {
    public static Specification<Payment> statusEquals(String status) {
        return (root, q, cb) -> cb.equal(root.get("status"), status);
    }
    public static Specification<Payment> enrollmentIdEquals(Long enrollmentId) {
        return (root, q, cb) -> cb.equal(root.get("enrollmentId"), enrollmentId);
    }
    public static Specification<Payment> createdBetween(LocalDate from, LocalDate to) {
        return (root, q, cb) -> cb.between(
                root.get("createdAt"),
                from.atStartOfDay(),
                to.plusDays(1).atStartOfDay().minusNanos(1)
        );
    }
    private PaymentSpecs() {}
}
