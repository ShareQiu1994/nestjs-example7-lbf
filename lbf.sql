--
-- PostgreSQL database dump
--
-- Dumped from database version 9.6.2
-- Dumped by pg_dump version 9.6.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: bookmark; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE bookmark (
    id integer NOT NULL,
    userid integer,
    name character varying(255),
    date character varying(255),
    json json NOT NULL
);


ALTER TABLE bookmark OWNER TO postgres;

--
-- Name: bookmark_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE bookmark_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE bookmark_id_seq OWNER TO postgres;

--
-- Name: bookmark_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE bookmark_id_seq OWNED BY bookmark.id;


--
-- Name: photo; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE photo (
    id integer NOT NULL,
    name character varying(255),
    description text,
    filename character varying(255),
    views integer,
    "isPublished" boolean
);


ALTER TABLE photo OWNER TO postgres;

--
-- Name: photo_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE photo_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE photo_id_seq OWNER TO postgres;

--
-- Name: photo_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE photo_id_seq OWNED BY photo.id;


--
-- Name: systemsetting; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE systemsetting (
    id integer NOT NULL,
    name character varying(32) NOT NULL,
    clock json NOT NULL,
    "earthRotation" smallint NOT NULL,
    "appearanceSettings" json NOT NULL,
    "postProcessing" json NOT NULL,
    wireframe smallint NOT NULL,
    "depthTestAgainstTerrain" smallint NOT NULL,
    "currentTime" smallint NOT NULL,
    clustering json NOT NULL,
    theme smallint NOT NULL,
    layer json NOT NULL,
    terrain smallint NOT NULL
);


ALTER TABLE systemsetting OWNER TO postgres;

--
-- Name: systemsetting_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE systemsetting_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE systemsetting_id_seq OWNER TO postgres;

--
-- Name: systemsetting_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE systemsetting_id_seq OWNED BY systemsetting.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE users (
    id integer NOT NULL,
    username character varying(255),
    password character varying(255),
    telephone character varying(255),
    email character varying(255)
);


ALTER TABLE users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE users_id_seq OWNED BY users.id;


--
-- Name: bookmark id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY bookmark ALTER COLUMN id SET DEFAULT nextval('bookmark_id_seq'::regclass);


--
-- Name: photo id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY photo ALTER COLUMN id SET DEFAULT nextval('photo_id_seq'::regclass);


--
-- Name: systemsetting id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY systemsetting ALTER COLUMN id SET DEFAULT nextval('systemsetting_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY users ALTER COLUMN id SET DEFAULT nextval('users_id_seq'::regclass);


--
-- Data for Name: bookmark; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY bookmark (id, userid, name, date, json) FROM stdin;
60	\N	11	2021-05-07	"{\\"longitude\\":135.69153770690352,\\"latitude\\":57.622699796500584,\\"height\\":318330.7349046262,\\"heading\\":227.63458456883117,\\"pitch\\":-50.39656405597168,\\"roll\\":359.79850998888674}"
61	\N	11	2021-05-07	"{\\"longitude\\":101.24155537457379,\\"latitude\\":19.67397950453444,\\"height\\":1706825.7963009898,\\"heading\\":357.82092403527525,\\"pitch\\":-89.1828608804455,\\"roll\\":0}"
62	\N	日本	2021-06-17	"{\\"longitude\\":131.5604620174369,\\"latitude\\":28.76588921009904,\\"height\\":10008822.333532624,\\"heading\\":12.149065270246846,\\"pitch\\":-84.77962980234662,\\"roll\\":0.387410411476872}"
51	\N	北京	2021-04-07	"{\\"longitude\\":107.65748282419779,\\"latitude\\":26.231794088696084,\\"height\\":10008049.751187027,\\"heading\\":359.47563374101475,\\"pitch\\":-84.78563976474832,\\"roll\\":359.98416532852326}"
55	\N	11111111111	2021-04-14	"{\\"longitude\\":109.99999999999999,\\"latitude\\":45.144317705929204,\\"height\\":14127480.885920575,\\"heading\\":360,\\"pitch\\":-90,\\"roll\\":0}"
57	\N	1111111111111111	2021-04-15	"{\\"longitude\\":107.65748343540058,\\"latitude\\":26.23179902329725,\\"height\\":10008050.826017132,\\"heading\\":359.4756338778308,\\"pitch\\":-84.78564112526419,\\"roll\\":359.98416533265504}"
58	\N	1111111111111111	2021-04-15	"{\\"longitude\\":116.4779943782662,\\"latitude\\":40.18139582416766,\\"height\\":1323.78040877976,\\"heading\\":3.3017323448916422,\\"pitch\\":-63.56147793531989,\\"roll\\":0.02469021260177994}"
63	\N	mn	2021-07-05	"{\\"longitude\\":164.80807781406207,\\"latitude\\":17.578265373814414,\\"height\\":14118698.62729412,\\"heading\\":41.5936843296124,\\"pitch\\":-89.86807129567033,\\"roll\\":0}"
64	\N	11	2021-10-13	"{\\"longitude\\":109.99999999999997,\\"latitude\\":45.148356518535,\\"height\\":35186581.39625604,\\"heading\\":360,\\"pitch\\":-89.99520837295539,\\"roll\\":0}"
\.


--
-- Name: bookmark_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('bookmark_id_seq', 64, true);


--
-- Data for Name: photo; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY photo (id, name, description, filename, views, "isPublished") FROM stdin;
1	string	str2222222ing	string	0	t
5	string	string	string	0	t
6	st222ring	str111ing	stri222ng	0	t
7	string	string	string	0	t
8	string	string	string	0	t
9	string	string	string	0	t
10	string	string	string	0	t
11	string	string	string	0	t
12	string	string	string	0	t
13	string	string	string	0	t
14	string	string	string	0	t
15	string	string	string	0	t
16	string	string	string	0	t
17	string	string	string	0	t
18	string	string	string	0	t
19	string	string	string	0	t
\.


--
-- Name: photo_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('photo_id_seq', 19, true);


--
-- Data for Name: systemsetting; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY systemsetting (id, name, clock, "earthRotation", "appearanceSettings", "postProcessing", wireframe, "depthTestAgainstTerrain", "currentTime", clustering, theme, layer, terrain) FROM stdin;
1	可视化调度台	"{\\"status\\":true,\\"multiplier\\":1,\\"currentTime\\":1587202451510}"	0	"{\\"Illumination\\":{\\"status\\":true},\\"groundAtmosphere\\":{\\"status\\":true},\\"fog\\":{\\"status\\":true},\\"sky\\":{\\"status\\":true,\\"hueShift\\":0,\\"saturationShift\\":0,\\"brightnessShift\\":0},\\"globe\\":{\\"status\\":true,\\"atmosphereHueShift\\":0,\\"atmosphereSaturationShift\\":0,\\"atmosphereBrightnessShift\\":0,\\"lightingFadeOutDistance\\":10000000,\\"lightingFadeInDistance\\":20000000,\\"nightFadeOutDistance\\":10000000,\\"nightFadeInDistance\\":50000000},\\"starSky\\":{\\"status\\":true},\\"sun\\":{\\"status\\":true},\\"moon\\":{\\"status\\":true}}"	"{\\"blackWhite\\":{\\"status\\":false,\\"value\\":5},\\"nightVision\\":{\\"status\\":false},\\"brightness\\":{\\"status\\":false,\\"value\\":0.5},\\"outline\\":{\\"status\\":false,\\"color\\":\\"#ff6600\\"},\\"depthOfField\\":{\\"status\\":false,\\"focalDistance\\":5,\\"delta\\":1,\\"sigma\\":2,\\"stepSize\\":1},\\"lensFlare\\":{\\"status\\":false,\\"intensity\\":2,\\"distortion\\":10,\\"ghostDispersal\\":0.4,\\"haloWidth\\":0.4},\\"bloom\\":{\\"status\\":false,\\"glowOnly\\":false,\\"contrast\\":128,\\"brightness\\":-0.3,\\"delta\\":1,\\"sigma\\":2,\\"stepSize\\":1}}"	0	0	0	"{\\"enabled\\":false,\\"pixelRange\\":15,\\"minimumClusterSize\\":2}"	0	"{\\"currentIndex\\":0,\\"data\\":[{\\"brightness\\":1,\\"contrast\\":1,\\"hue\\":0,\\"gamma\\":1,\\"alpha\\":1},{\\"brightness\\":1,\\"contrast\\":1,\\"hue\\":0,\\"gamma\\":1,\\"alpha\\":1}]}"	0
\.


--
-- Name: systemsetting_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('systemsetting_id_seq', 1, false);


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY users (id, username, password, telephone, email) FROM stdin;
1	liubofang	123456	15819588170	4214149567@qq.com
\.


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('users_id_seq', 1, true);


--
-- Name: systemsetting PK_82d9901bc0a281741ba38f8976a; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY systemsetting
    ADD CONSTRAINT "PK_82d9901bc0a281741ba38f8976a" PRIMARY KEY (id);


--
-- Name: bookmark PK_b7fbf4a865ba38a590bb9239814; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY bookmark
    ADD CONSTRAINT "PK_b7fbf4a865ba38a590bb9239814" PRIMARY KEY (id);


--
-- Name: photo photo_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY photo
    ADD CONSTRAINT photo_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

