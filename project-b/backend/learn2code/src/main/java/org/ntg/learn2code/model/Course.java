package org.ntg.learn2code.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Entity
@Table(name = "courses")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Course {

    @Id
    @SequenceGenerator(name = "courses_id_seq", sequenceName = "courses_id_seq", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "courses_id_seq")
    private Long id;

    @Column(name = "division_id")
    private Long divisionId;

    private String title;
    private String description;

    @Column(name = "base_price")
    private java.math.BigDecimal basePrice;

    @Column(name = "is_active")
    private Boolean isActive = true;

    // optional back-reference (keep LAZY and ignore during JSON)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "division_id", insertable = false, updatable = false)
    @JsonIgnore
    private Division division;
}
