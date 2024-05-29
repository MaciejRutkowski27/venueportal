import { Link, useLocation } from "react-router-dom";

export default function Navigation() {
    const location = useLocation();
    return (
      <>
        <div className="sidenav">
          <Link to="/">
            <svg
              className="navlogo"
              version="1.0"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 337.000000 150.000000"
              preserveAspectRatio="xMidYMid meet"
            >
              <g
                transform="translate(0.000000,150.000000) scale(0.100000,-0.100000)"
                fill="#F4EFE2"
                stroke="none"
              >
                <path
                  d="M1573 1490 c-100 -20 -168 -81 -199 -178 -25 -81 -25 -343 1 -425 23
-73 71 -128 137 -158 45 -20 70 -23 168 -23 139 -1 187 12 246 66 64 59 85
123 91 278 12 280 -44 398 -204 436 -63 15 -174 17 -240 4z m285 -62 c94 -49
128 -158 120 -385 -4 -107 -8 -128 -32 -178 -44 -90 -116 -124 -258 -125 -108
0 -165 16 -215 63 -63 58 -77 113 -77 302 0 187 14 235 81 294 57 50 100 61
231 57 85 -3 111 -8 150 -28z"
                />
                <path
                  d="M1496 1273 c11 -23 12 -322 0 -345 -7 -16 -1 -18 63 -18 39 0 71 3
71 8 0 4 -7 16 -15 26 -8 11 -15 39 -15 63 0 41 1 43 29 43 24 0 34 -8 56 -46
23 -39 25 -50 16 -70 l-11 -24 84 0 c81 0 86 1 115 31 30 29 41 59 22 59 -5 0
-14 -7 -21 -15 -17 -21 -63 -19 -91 4 l-23 18 67 37 c52 29 67 43 67 60 0 28
-39 66 -68 66 -15 0 -27 11 -39 37 -33 67 -59 78 -195 81 -114 4 -120 3 -112
-15z m170 -21 c42 -29 59 -116 28 -146 -22 -23 -71 -20 -84 3 -11 21 -14 110
-4 135 6 17 41 21 60 8z m169 -136 c8 -25 6 -31 -19 -53 -35 -30 -50 -26 -54
15 -7 69 51 100 73 38z"
                />
                <path
                  d="M2653 731 c-51 -25 -93 -50 -93 -56 0 -6 9 -28 20 -50 18 -36 20 -59
20 -275 0 -216 -2 -238 -20 -273 -36 -66 -35 -67 104 -67 80 0 127 4 132 11 3
6 -4 25 -17 42 -24 32 -24 32 -27 369 -2 252 -6 337 -15 341 -7 2 -54 -16
-104 -42z"
                />
                <path
                  d="M10 715 c0 -8 9 -32 20 -54 20 -37 21 -53 18 -304 -3 -241 -5 -267
-21 -285 -10 -11 -17 -29 -15 -39 3 -16 16 -18 126 -21 139 -3 151 3 110 58
-19 26 -24 46 -26 121 l-4 89 54 0 53 0 49 -91 c48 -90 48 -92 32 -119 -34
-58 -30 -60 123 -60 87 0 142 4 146 11 4 5 -13 31 -37 57 -65 70 -166 234
-148 240 31 10 99 92 106 127 13 70 0 142 -33 183 -65 80 -150 102 -389 102
-138 0 -164 -2 -164 -15z m340 -81 c53 -45 77 -113 66 -189 -10 -65 -43 -95
-105 -95 -57 0 -81 17 -82 58 -2 110 4 229 13 239 18 22 74 15 108 -13z"
                />
                <path
                  d="M804 486 c-47 -21 -105 -77 -125 -121 -43 -94 -13 -246 59 -307 70
-59 186 -73 267 -32 41 20 88 74 100 112 9 31 -18 39 -50 14 -54 -43 -145 -36
-185 15 l-20 26 107 60 c60 32 114 66 121 75 34 44 -6 130 -75 158 -41 18
-158 17 -199 0z m121 -46 c19 -21 31 -107 18 -126 -12 -17 -106 -73 -114 -68
-11 7 -21 101 -14 133 15 71 73 102 110 61z"
                />
                <path
                  d="M1270 484 c-144 -62 -193 -260 -96 -387 105 -137 331 -123 391 26 14
33 14 38 1 43 -9 3 -27 -3 -41 -14 -36 -28 -95 -37 -136 -19 -32 14 -77 53
-68 61 2 1 50 29 106 60 56 31 109 64 118 72 40 40 -1 131 -72 160 -43 18
-159 17 -203 -2z m126 -45 c13 -14 18 -36 19 -72 0 -52 0 -52 -55 -88 -30 -21
-58 -35 -61 -33 -12 7 -21 94 -14 134 12 71 71 103 111 59z"
                />
                <path
                  d="M2210 468 c-97 -59 -139 -167 -110 -287 18 -76 84 -146 158 -167 101
-30 205 1 257 76 25 36 34 80 16 80 -5 0 -32 -12 -60 -26 -39 -20 -58 -25 -85
-20 -33 6 -96 49 -96 65 0 4 48 34 106 67 115 64 140 89 130 130 -19 75 -85
114 -192 114 -61 0 -77 -4 -124 -32z m149 -27 c25 -25 37 -85 23 -115 -6 -13
-34 -37 -64 -54 -47 -28 -54 -29 -60 -14 -12 31 -8 132 7 162 23 44 62 53 94
21z"
                />
                <path
                  d="M2935 485 c-102 -36 -118 -155 -21 -155 38 0 58 18 81 78 19 46 48
62 83 43 21 -11 42 -83 42 -142 0 -27 -2 -29 -21 -19 -27 15 -117 16 -161 1
-55 -18 -90 -62 -95 -118 -11 -110 52 -167 184 -168 58 0 77 4 101 22 28 21
29 21 45 2 14 -15 30 -19 88 -19 38 0 79 5 91 11 20 11 20 11 -6 38 -23 24
-28 43 -41 147 -9 65 -21 134 -27 153 -15 47 -84 114 -134 129 -55 16 -159 15
-209 -3z m173 -246 c34 -36 43 -129 16 -167 -41 -59 -104 0 -104 97 0 83 44
118 88 70z"
                />
                <path
                  d="M1560 477 c0 -7 13 -31 28 -53 16 -21 61 -115 102 -209 41 -94 80
-178 88 -187 22 -26 127 -25 141 1 6 10 38 92 71 182 64 170 81 205 112 227
10 7 18 22 18 33 0 17 -7 19 -85 19 -92 0 -98 -5 -65 -47 11 -14 20 -35 20
-47 0 -21 -68 -224 -79 -238 -4 -4 -28 51 -55 122 -43 113 -48 133 -38 155 25
54 23 55 -123 55 -104 0 -135 -3 -135 -13z"
                />
              </g>
            </svg>
          </Link>
          <div className="navigation">
            <Link to="/" style={{ textDecoration: "none" }}>
              <p
                className={`nav_element ${
                  location.pathname === "/" ? "active" : ""
                }`}
              >
                Home
              </p>
            </Link>
            <Link to="/profile" style={{ textDecoration: "none" }}>
              <p
                className={`nav_element ${
                  location.pathname === "/profile" ? "active" : ""
                }`}
              >
                Profile
              </p>
            </Link>
            <Link to="/venue-spaces" style={{ textDecoration: "none" }}>
              <p
                className={`nav_element ${
                  location.pathname === "/venue-spaces" ? "active" : ""
                }`}
              >
                Spaces
              </p>
            </Link>
            <Link to="/all-products" style={{ textDecoration: "none" }}>
              <p
                className={`nav_element ${
                  location.pathname === "/all-products" ? "active" : ""
                }`}
              >
                Add
              </p>
            </Link>
            <p
              className={`nav_element ${
                location.pathname === "/remove-products" ? "active" : ""
              }`}
            >
              Remove
            </p>
            <Link to="/move" style={{ textDecoration: "none" }}>
              <p
                className={`nav_element ${
                  location.pathname === "/move" ? "active" : ""
                }`}
              >
                Move
              </p>
            </Link>
          </div>
          <div className="optioncontainer">
            <Link to="/guides" style={{ textDecoration: "none" }}>
              <div className="options">
                <img src={require("../assets/help.png")} alt="Help" />
                <p
                  className={`help_element ${
                    location.pathname === "/guides" ? "active" : ""
                  }`}
                >
                  Guides
                </p>
              </div>
            </Link>
            <Link to="/login" style={{ textDecoration: "none" }}>
              <div className="options">
                <img src={require("../assets/logout.png")} alt="logout" />
                Log Out
              </div>
            </Link>
          </div>
        </div>
      </>
    );
}