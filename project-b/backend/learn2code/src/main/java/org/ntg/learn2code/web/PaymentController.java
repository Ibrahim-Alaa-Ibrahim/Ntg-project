package org.ntg.learn2code.web;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.ntg.learn2code.model.Payment;
import org.ntg.learn2code.repository.PaymentRepository;
import org.ntg.learn2code.repository.PaymentSpecs;
import org.ntg.learn2code.web.dto.PaymentRequest;
import org.ntg.learn2code.web.dto.PaymentResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.web.PageableDefault;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentRepository paymentRepo;

    // GET /api/payments?status=completed&enrollmentId=4&from=2025-08-23&to=2025-08-24&page=0&size=5&sort=createdAt,desc
    @GetMapping("/payments")
    @Transactional(readOnly = true)
    public Page<PaymentResponse> list(
            @RequestParam(required = false) String status,
            @RequestParam(required = false) Long enrollmentId,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate from,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate to,
            @PageableDefault(size = 20, sort = "createdAt", direction = Sort.Direction.DESC) Pageable pageable
    ) {
        LocalDate fromDate = (from != null) ? from : LocalDate.of(1970, 1, 1);
        LocalDate toDate   = (to   != null) ? to   : LocalDate.of(3000, 1, 1);

        // Build spec safely; null parts are ignored by Spring Data
        Specification<Payment> spec =
                Specification.where((status != null && !status.isBlank()) ? PaymentSpecs.statusEquals(status) : null)
                        .and(enrollmentId != null ? PaymentSpecs.enrollmentIdEquals(enrollmentId) : null)
                        .and((from != null || to != null) ? PaymentSpecs.createdBetween(fromDate, toDate) : null);

        return paymentRepo.findAll(spec, pageable)
                .map(p -> new PaymentResponse(p.getId(), p.getStatus(), p.getTransactionRef()));
    }

    @GetMapping("/payments/{id}")
    @Transactional(readOnly = true)
    public ResponseEntity<PaymentResponse> get(@PathVariable Long id) {
        return paymentRepo.findById(id)
                .map(p -> new PaymentResponse(p.getId(), p.getStatus(), p.getTransactionRef()))
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/enrollments/{enrollmentId}/payments")
    @Transactional(readOnly = true)
    public List<PaymentResponse> byEnrollment(@PathVariable Long enrollmentId) {
        return paymentRepo.findByEnrollmentId(enrollmentId, Sort.by("id"))
                .stream()
                .map(p -> new PaymentResponse(p.getId(), p.getStatus(), p.getTransactionRef()))
                .toList();
    }

    @PostMapping("/payments")
    @Transactional
    public ResponseEntity<PaymentResponse> create(@Valid @RequestBody PaymentRequest req) {
        Payment p = new Payment();
        p.setEnrollmentId(req.enrollmentId());
        p.setAmount(req.amount());
        p.setMethod(req.method());
        p.setStatus("completed"); // or "pending" if you prefer
        p.setTransactionRef("TXN" + System.currentTimeMillis());

        Payment saved = paymentRepo.save(p);

        return ResponseEntity.ok(
                new PaymentResponse(saved.getId(), saved.getStatus(), saved.getTransactionRef())
        );
    }

}
