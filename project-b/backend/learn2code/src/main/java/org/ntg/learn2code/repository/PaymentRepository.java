package org.ntg.learn2code.repository;

import java.util.List;

import org.ntg.learn2code.model.Payment;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface PaymentRepository
        extends JpaRepository<Payment, Long>, JpaSpecificationExecutor<Payment> {

    List<Payment> findByEnrollmentId(Long enrollmentId, Sort sort);
}
