package org.ntg.learn2code.model;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Entity @Table(name = "payments")
public class Payment {
    @Id
    @SequenceGenerator(name = "payments_id_seq", sequenceName = "payments_id_seq", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "payments_id_seq")
    private Long id;

    @Column(name = "enrollment_id", nullable = false)
    private Long enrollmentId;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal amount;

    private String method;          // e.g. "credit_card", "paypal"
    private String status;          // e.g. "completed", "pending"

    @Column(name = "transaction_ref")
    private String transactionRef;

    @Column(name = "created_at", insertable = false, updatable = false)
    private LocalDateTime createdAt; // DB default now()
}
