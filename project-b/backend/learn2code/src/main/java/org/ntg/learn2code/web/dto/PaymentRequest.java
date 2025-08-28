package org.ntg.learn2code.web.dto;

import jakarta.validation.constraints.*;
import java.math.BigDecimal;

public record PaymentRequest(
        @NotNull Long enrollmentId,
        @NotNull @Positive BigDecimal amount,
        @NotBlank String method
) {}