--
-- PostgreSQL database dump
--

-- Dumped from database version 17.6
-- Dumped by pg_dump version 17.6

-- Started on 2025-08-23 19:07:29

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 229 (class 1259 OID 25625)
-- Name: course_instructors; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.course_instructors (
    course_id bigint NOT NULL,
    instructor_id bigint NOT NULL
);


ALTER TABLE public.course_instructors OWNER TO postgres;

--
-- TOC entry 226 (class 1259 OID 25596)
-- Name: course_levels; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.course_levels (
    id bigint NOT NULL,
    course_id bigint NOT NULL,
    level_number integer NOT NULL,
    title text,
    description text,
    price numeric(10,2),
    duration_hours integer
);


ALTER TABLE public.course_levels OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 25595)
-- Name: course_levels_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.course_levels_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.course_levels_id_seq OWNER TO postgres;

--
-- TOC entry 4964 (class 0 OID 0)
-- Dependencies: 225
-- Name: course_levels_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.course_levels_id_seq OWNED BY public.course_levels.id;


--
-- TOC entry 224 (class 1259 OID 25581)
-- Name: courses; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.courses (
    id bigint NOT NULL,
    division_id bigint,
    title text NOT NULL,
    description text,
    base_price numeric(10,2),
    is_active boolean DEFAULT true
);


ALTER TABLE public.courses OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 25580)
-- Name: courses_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.courses_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.courses_id_seq OWNER TO postgres;

--
-- TOC entry 4965 (class 0 OID 0)
-- Dependencies: 223
-- Name: courses_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.courses_id_seq OWNED BY public.courses.id;


--
-- TOC entry 222 (class 1259 OID 25572)
-- Name: divisions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.divisions (
    id bigint NOT NULL,
    name text NOT NULL,
    description text
);


ALTER TABLE public.divisions OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 25571)
-- Name: divisions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.divisions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.divisions_id_seq OWNER TO postgres;

--
-- TOC entry 4966 (class 0 OID 0)
-- Dependencies: 221
-- Name: divisions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.divisions_id_seq OWNED BY public.divisions.id;


--
-- TOC entry 231 (class 1259 OID 25641)
-- Name: enrollments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.enrollments (
    id bigint NOT NULL,
    user_id bigint NOT NULL,
    course_id bigint NOT NULL,
    level_id bigint,
    status text DEFAULT 'reserved'::text NOT NULL,
    price_at_enroll numeric(10,2),
    reserved_at timestamp without time zone,
    paid_at timestamp without time zone
);


ALTER TABLE public.enrollments OWNER TO postgres;

--
-- TOC entry 230 (class 1259 OID 25640)
-- Name: enrollments_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.enrollments_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.enrollments_id_seq OWNER TO postgres;

--
-- TOC entry 4967 (class 0 OID 0)
-- Dependencies: 230
-- Name: enrollments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.enrollments_id_seq OWNED BY public.enrollments.id;


--
-- TOC entry 220 (class 1259 OID 25558)
-- Name: instructors; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.instructors (
    id bigint NOT NULL,
    user_id bigint NOT NULL
);


ALTER TABLE public.instructors OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 25557)
-- Name: instructors_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.instructors_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.instructors_id_seq OWNER TO postgres;

--
-- TOC entry 4968 (class 0 OID 0)
-- Dependencies: 219
-- Name: instructors_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.instructors_id_seq OWNED BY public.instructors.id;


--
-- TOC entry 228 (class 1259 OID 25612)
-- Name: lessons; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.lessons (
    id bigint NOT NULL,
    level_id bigint NOT NULL,
    title text NOT NULL,
    content_type text,
    content_url text,
    order_index integer
);


ALTER TABLE public.lessons OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 25611)
-- Name: lessons_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.lessons_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.lessons_id_seq OWNER TO postgres;

--
-- TOC entry 4969 (class 0 OID 0)
-- Dependencies: 227
-- Name: lessons_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.lessons_id_seq OWNED BY public.lessons.id;


--
-- TOC entry 233 (class 1259 OID 25668)
-- Name: payments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.payments (
    id bigint NOT NULL,
    enrollment_id bigint NOT NULL,
    amount numeric(10,2) NOT NULL,
    method text,
    status text,
    transaction_ref text,
    created_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.payments OWNER TO postgres;

--
-- TOC entry 232 (class 1259 OID 25667)
-- Name: payments_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.payments_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.payments_id_seq OWNER TO postgres;

--
-- TOC entry 4970 (class 0 OID 0)
-- Dependencies: 232
-- Name: payments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.payments_id_seq OWNED BY public.payments.id;


--
-- TOC entry 235 (class 1259 OID 25683)
-- Name: reviews; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.reviews (
    id bigint NOT NULL,
    user_id bigint NOT NULL,
    course_id bigint NOT NULL,
    rating integer,
    comment text,
    created_at timestamp without time zone DEFAULT now(),
    CONSTRAINT reviews_rating_check CHECK (((rating >= 1) AND (rating <= 5)))
);


ALTER TABLE public.reviews OWNER TO postgres;

--
-- TOC entry 234 (class 1259 OID 25682)
-- Name: reviews_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.reviews_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.reviews_id_seq OWNER TO postgres;

--
-- TOC entry 4971 (class 0 OID 0)
-- Dependencies: 234
-- Name: reviews_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.reviews_id_seq OWNED BY public.reviews.id;


--
-- TOC entry 218 (class 1259 OID 25547)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id bigint NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    password_hash text NOT NULL,
    role text NOT NULL,
    phone text
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 25546)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO postgres;

--
-- TOC entry 4972 (class 0 OID 0)
-- Dependencies: 217
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 4744 (class 2604 OID 25599)
-- Name: course_levels id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.course_levels ALTER COLUMN id SET DEFAULT nextval('public.course_levels_id_seq'::regclass);


--
-- TOC entry 4742 (class 2604 OID 25584)
-- Name: courses id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.courses ALTER COLUMN id SET DEFAULT nextval('public.courses_id_seq'::regclass);


--
-- TOC entry 4741 (class 2604 OID 25575)
-- Name: divisions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.divisions ALTER COLUMN id SET DEFAULT nextval('public.divisions_id_seq'::regclass);


--
-- TOC entry 4746 (class 2604 OID 25644)
-- Name: enrollments id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.enrollments ALTER COLUMN id SET DEFAULT nextval('public.enrollments_id_seq'::regclass);


--
-- TOC entry 4740 (class 2604 OID 25561)
-- Name: instructors id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.instructors ALTER COLUMN id SET DEFAULT nextval('public.instructors_id_seq'::regclass);


--
-- TOC entry 4745 (class 2604 OID 25615)
-- Name: lessons id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lessons ALTER COLUMN id SET DEFAULT nextval('public.lessons_id_seq'::regclass);


--
-- TOC entry 4748 (class 2604 OID 25671)
-- Name: payments id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payments ALTER COLUMN id SET DEFAULT nextval('public.payments_id_seq'::regclass);


--
-- TOC entry 4750 (class 2604 OID 25686)
-- Name: reviews id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reviews ALTER COLUMN id SET DEFAULT nextval('public.reviews_id_seq'::regclass);


--
-- TOC entry 4739 (class 2604 OID 25550)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 4952 (class 0 OID 25625)
-- Dependencies: 229
-- Data for Name: course_instructors; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.course_instructors (course_id, instructor_id) FROM stdin;
1	1
2	2
3	1
4	2
\.


--
-- TOC entry 4949 (class 0 OID 25596)
-- Dependencies: 226
-- Data for Name: course_levels; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.course_levels (id, course_id, level_number, title, description, price, duration_hours) FROM stdin;
1	1	1	Web Level 1	HTML and CSS basics	80.00	20
2	2	1	AI Level 1	Understanding AI and simple ML examples	100.00	25
3	3	1	Python Level 1	Learn Python syntax and simple programs	70.00	18
4	4	1	Database Level 1	Intro to SQL and tables	90.00	22
\.


--
-- TOC entry 4947 (class 0 OID 25581)
-- Dependencies: 224
-- Data for Name: courses; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.courses (id, division_id, title, description, base_price, is_active) FROM stdin;
1	1	Introduction to Web Development	Learn HTML, CSS, and basics of websites	80.00	t
2	2	Introduction to Artificial Intelligence	Simple concepts of AI and Machine Learning	100.00	t
3	3	Introduction to Python Programming	Learn Python basics: variables, loops, and functions	70.00	t
4	4	Introduction to Databases	Basics of storing data with SQL	90.00	t
\.


--
-- TOC entry 4945 (class 0 OID 25572)
-- Dependencies: 222
-- Data for Name: divisions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.divisions (id, name, description) FROM stdin;
1	Web Development	Courses to learn how to build websites
2	Artificial Intelligence	Courses to explore AI basics
3	Programming Languages	Learn programming from scratch
4	Databases	Introduction to storing and managing data
\.


--
-- TOC entry 4954 (class 0 OID 25641)
-- Dependencies: 231
-- Data for Name: enrollments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.enrollments (id, user_id, course_id, level_id, status, price_at_enroll, reserved_at, paid_at) FROM stdin;
1	1	1	1	active	80.00	2025-08-23 19:03:20.773811	2025-08-23 19:03:20.773811
2	2	1	1	active	80.00	2025-08-23 19:03:20.773811	2025-08-23 19:03:20.773811
3	1	3	3	active	70.00	2025-08-23 19:03:20.773811	2025-08-23 19:03:20.773811
4	2	2	2	reserved	100.00	2025-08-23 19:03:20.773811	\N
\.


--
-- TOC entry 4943 (class 0 OID 25558)
-- Dependencies: 220
-- Data for Name: instructors; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.instructors (id, user_id) FROM stdin;
1	3
2	4
\.


--
-- TOC entry 4951 (class 0 OID 25612)
-- Dependencies: 228
-- Data for Name: lessons; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.lessons (id, level_id, title, content_type, content_url, order_index) FROM stdin;
1	1	HTML Basics	video	https://example.com/html_basics	1
2	1	CSS Styling	pdf	https://example.com/css_styling.pdf	2
3	2	What is AI?	video	https://example.com/what_is_ai	1
4	2	AI in Daily Life	article	https://example.com/ai_daily	2
5	3	Python Variables	video	https://example.com/python_variables	1
6	3	Loops in Python	pdf	https://example.com/python_loops.pdf	2
7	4	Intro to SQL	video	https://example.com/sql_intro	1
8	4	Creating Tables	pdf	https://example.com/create_tables.pdf	2
\.


--
-- TOC entry 4956 (class 0 OID 25668)
-- Dependencies: 233
-- Data for Name: payments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.payments (id, enrollment_id, amount, method, status, transaction_ref, created_at) FROM stdin;
1	1	80.00	credit_card	completed	TXN3001	2025-08-23 19:03:20.773811
2	2	80.00	paypal	completed	TXN3002	2025-08-23 19:03:20.773811
3	3	70.00	credit_card	completed	TXN3003	2025-08-23 19:03:20.773811
4	4	100.00	credit_card	pending	TXN3004	2025-08-23 19:03:20.773811
\.


--
-- TOC entry 4958 (class 0 OID 25683)
-- Dependencies: 235
-- Data for Name: reviews; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.reviews (id, user_id, course_id, rating, comment, created_at) FROM stdin;
1	1	1	5	Web course was easy and fun!	2025-08-23 19:03:20.773811
2	2	1	4	I learned HTML quickly	2025-08-23 19:03:20.773811
3	1	3	5	Python basics were explained very well	2025-08-23 19:03:20.773811
4	2	2	4	Excited for the AI course!	2025-08-23 19:03:20.773811
\.


--
-- TOC entry 4941 (class 0 OID 25547)
-- Dependencies: 218
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, name, email, password_hash, role, phone) FROM stdin;
1	Ali Hassan	ali@student.com	hashed_pw1	student	0101001001
2	Sara Ahmed	sara@student.com	hashed_pw2	student	0102002002
3	Mona Ali	mona@school.com	hashed_pw3	instructor	0103003003
4	Omar Youssef	omar@school.com	hashed_pw4	instructor	0104004004
\.


--
-- TOC entry 4973 (class 0 OID 0)
-- Dependencies: 225
-- Name: course_levels_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.course_levels_id_seq', 4, true);


--
-- TOC entry 4974 (class 0 OID 0)
-- Dependencies: 223
-- Name: courses_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.courses_id_seq', 4, true);


--
-- TOC entry 4975 (class 0 OID 0)
-- Dependencies: 221
-- Name: divisions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.divisions_id_seq', 4, true);


--
-- TOC entry 4976 (class 0 OID 0)
-- Dependencies: 230
-- Name: enrollments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.enrollments_id_seq', 4, true);


--
-- TOC entry 4977 (class 0 OID 0)
-- Dependencies: 219
-- Name: instructors_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.instructors_id_seq', 2, true);


--
-- TOC entry 4978 (class 0 OID 0)
-- Dependencies: 227
-- Name: lessons_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.lessons_id_seq', 8, true);


--
-- TOC entry 4979 (class 0 OID 0)
-- Dependencies: 232
-- Name: payments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.payments_id_seq', 4, true);


--
-- TOC entry 4980 (class 0 OID 0)
-- Dependencies: 234
-- Name: reviews_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.reviews_id_seq', 4, true);


--
-- TOC entry 4981 (class 0 OID 0)
-- Dependencies: 217
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 4, true);


--
-- TOC entry 4772 (class 2606 OID 25629)
-- Name: course_instructors course_instructors_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.course_instructors
    ADD CONSTRAINT course_instructors_pkey PRIMARY KEY (course_id, instructor_id);


--
-- TOC entry 4766 (class 2606 OID 25605)
-- Name: course_levels course_levels_course_id_level_number_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.course_levels
    ADD CONSTRAINT course_levels_course_id_level_number_key UNIQUE (course_id, level_number);


--
-- TOC entry 4768 (class 2606 OID 25603)
-- Name: course_levels course_levels_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.course_levels
    ADD CONSTRAINT course_levels_pkey PRIMARY KEY (id);


--
-- TOC entry 4764 (class 2606 OID 25589)
-- Name: courses courses_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.courses
    ADD CONSTRAINT courses_pkey PRIMARY KEY (id);


--
-- TOC entry 4762 (class 2606 OID 25579)
-- Name: divisions divisions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.divisions
    ADD CONSTRAINT divisions_pkey PRIMARY KEY (id);


--
-- TOC entry 4774 (class 2606 OID 25649)
-- Name: enrollments enrollments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.enrollments
    ADD CONSTRAINT enrollments_pkey PRIMARY KEY (id);


--
-- TOC entry 4776 (class 2606 OID 25651)
-- Name: enrollments enrollments_user_id_course_id_level_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.enrollments
    ADD CONSTRAINT enrollments_user_id_course_id_level_id_key UNIQUE (user_id, course_id, level_id);


--
-- TOC entry 4758 (class 2606 OID 25563)
-- Name: instructors instructors_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.instructors
    ADD CONSTRAINT instructors_pkey PRIMARY KEY (id);


--
-- TOC entry 4760 (class 2606 OID 25565)
-- Name: instructors instructors_user_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.instructors
    ADD CONSTRAINT instructors_user_id_key UNIQUE (user_id);


--
-- TOC entry 4770 (class 2606 OID 25619)
-- Name: lessons lessons_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lessons
    ADD CONSTRAINT lessons_pkey PRIMARY KEY (id);


--
-- TOC entry 4778 (class 2606 OID 25676)
-- Name: payments payments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payments
    ADD CONSTRAINT payments_pkey PRIMARY KEY (id);


--
-- TOC entry 4780 (class 2606 OID 25692)
-- Name: reviews reviews_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_pkey PRIMARY KEY (id);


--
-- TOC entry 4782 (class 2606 OID 25694)
-- Name: reviews reviews_user_id_course_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_user_id_course_id_key UNIQUE (user_id, course_id);


--
-- TOC entry 4754 (class 2606 OID 25556)
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- TOC entry 4756 (class 2606 OID 25554)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 4787 (class 2606 OID 25630)
-- Name: course_instructors course_instructors_course_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.course_instructors
    ADD CONSTRAINT course_instructors_course_id_fkey FOREIGN KEY (course_id) REFERENCES public.courses(id) ON DELETE CASCADE;


--
-- TOC entry 4788 (class 2606 OID 25635)
-- Name: course_instructors course_instructors_instructor_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.course_instructors
    ADD CONSTRAINT course_instructors_instructor_id_fkey FOREIGN KEY (instructor_id) REFERENCES public.instructors(id) ON DELETE CASCADE;


--
-- TOC entry 4785 (class 2606 OID 25606)
-- Name: course_levels course_levels_course_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.course_levels
    ADD CONSTRAINT course_levels_course_id_fkey FOREIGN KEY (course_id) REFERENCES public.courses(id) ON DELETE CASCADE;


--
-- TOC entry 4784 (class 2606 OID 25590)
-- Name: courses courses_division_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.courses
    ADD CONSTRAINT courses_division_id_fkey FOREIGN KEY (division_id) REFERENCES public.divisions(id) ON DELETE SET NULL;


--
-- TOC entry 4789 (class 2606 OID 25657)
-- Name: enrollments enrollments_course_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.enrollments
    ADD CONSTRAINT enrollments_course_id_fkey FOREIGN KEY (course_id) REFERENCES public.courses(id) ON DELETE CASCADE;


--
-- TOC entry 4790 (class 2606 OID 25662)
-- Name: enrollments enrollments_level_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.enrollments
    ADD CONSTRAINT enrollments_level_id_fkey FOREIGN KEY (level_id) REFERENCES public.course_levels(id) ON DELETE SET NULL;


--
-- TOC entry 4791 (class 2606 OID 25652)
-- Name: enrollments enrollments_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.enrollments
    ADD CONSTRAINT enrollments_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- TOC entry 4783 (class 2606 OID 25566)
-- Name: instructors instructors_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.instructors
    ADD CONSTRAINT instructors_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- TOC entry 4786 (class 2606 OID 25620)
-- Name: lessons lessons_level_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lessons
    ADD CONSTRAINT lessons_level_id_fkey FOREIGN KEY (level_id) REFERENCES public.course_levels(id) ON DELETE CASCADE;


--
-- TOC entry 4792 (class 2606 OID 25677)
-- Name: payments payments_enrollment_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payments
    ADD CONSTRAINT payments_enrollment_id_fkey FOREIGN KEY (enrollment_id) REFERENCES public.enrollments(id) ON DELETE CASCADE;


--
-- TOC entry 4793 (class 2606 OID 25700)
-- Name: reviews reviews_course_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_course_id_fkey FOREIGN KEY (course_id) REFERENCES public.courses(id) ON DELETE CASCADE;


--
-- TOC entry 4794 (class 2606 OID 25695)
-- Name: reviews reviews_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


-- Completed on 2025-08-23 19:07:30

--
-- PostgreSQL database dump complete
--



