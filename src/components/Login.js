import React from "react";
import { Link } from "react-router-dom";

export default function Login() {
    return (
      <>
        <div className="loginPage">
          <div className="loginInfo">
            <svg
              className="loginLogo"
              version="1.0"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 337.000000 150.000000"
              preserveAspectRatio="xMidYMid meet"
            >
              <g
                transform="translate(0.000000,150.000000) scale(0.100000,-0.100000)"
                fill="#000000"
                stroke="none"
              >
                <path
                  d="M1563 1490 c-59 -12 -94 -33 -135 -78 -60 -67 -73 -122 -73 -312 1
-191 14 -246 74 -313 52 -58 107 -79 221 -85 185 -9 275 30 331 144 l34 69 0
185 c-1 151 -4 193 -18 229 -27 70 -64 111 -126 139 -47 22 -73 26 -161 28
-58 2 -124 -1 -147 -6z m275 -55 c54 -23 99 -72 119 -129 25 -74 25 -340 0
-411 -21 -62 -57 -101 -116 -128 -37 -17 -67 -21 -151 -22 -169 0 -241 42
-276 160 -23 82 -17 375 10 425 54 101 127 133 289 125 48 -3 104 -12 125 -20z"
                />
                <path
                  d="M1490 1277 c0 -7 5 -18 11 -24 12 -12 8 -299 -5 -325 -7 -16 -1 -18
63 -18 65 0 87 9 61 25 -5 3 -10 31 -10 61 0 51 1 54 25 54 33 0 84 -92 64
-117 -21 -24 8 -34 84 -29 74 5 111 23 129 62 15 33 7 38 -30 17 -24 -14 -37
-15 -59 -8 -45 17 -38 37 24 71 61 32 74 55 53 93 -5 11 -27 25 -48 30 -31 9
-40 18 -51 47 -20 55 -70 74 -203 74 -82 0 -108 -3 -108 -13z m185 -39 c57
-51 38 -152 -28 -146 l-32 3 -3 69 c-2 38 -1 75 2 83 8 19 32 16 61 -9z m158
-122 c9 -26 7 -32 -19 -53 -36 -29 -48 -25 -52 15 -7 69 51 100 71 38z"
                />
                <path
                  d="M2660 739 c-115 -55 -115 -55 -90 -96 19 -32 20 -51 20 -291 0 -236
-2 -259 -19 -286 -34 -51 -22 -56 114 -56 73 0 126 4 130 10 4 6 -4 27 -17 48
-23 36 -23 43 -28 371 -3 216 -9 336 -15 338 -6 2 -49 -15 -95 -38z"
                />
                <path
                  d="M10 709 c0 -13 7 -33 15 -43 22 -29 22 -563 0 -592 -8 -10 -15 -29
-15 -41 0 -23 2 -23 125 -23 141 0 153 6 116 59 -18 24 -21 44 -21 120 l0 91
48 0 47 0 47 -92 47 -91 -21 -34 c-13 -22 -17 -38 -11 -44 14 -14 285 -7 290
8 2 6 -10 24 -28 40 -17 15 -62 75 -99 132 l-68 105 49 44 c122 109 90 285
-64 353 -48 21 -69 23 -254 27 l-203 4 0 -23z m347 -81 c72 -67 81 -207 16
-257 -32 -26 -99 -28 -125 -4 -16 14 -18 33 -18 143 0 87 4 130 13 139 18 19
84 7 114 -21z"
                />
                <path
                  d="M850 501 c-136 -29 -220 -163 -190 -306 38 -183 268 -259 397 -131
71 71 69 140 -4 91 -54 -37 -87 -40 -141 -13 -26 12 -48 30 -50 39 -2 10 26
31 85 64 138 76 143 81 143 125 0 43 -33 91 -79 114 -34 18 -117 26 -161 17z
m70 -61 c23 -23 33 -56 28 -96 -2 -22 -16 -38 -58 -66 -61 -40 -64 -39 -74 32
-15 106 48 186 104 130z"
                />
                <path
                  d="M1315 501 c-194 -48 -260 -292 -116 -432 91 -88 232 -93 321 -13 67
61 78 155 12 103 -32 -25 -89 -40 -121 -32 -37 9 -83 43 -79 59 2 7 53 42 113
76 l110 63 3 43 c3 39 -1 47 -35 81 -50 51 -131 70 -208 52z m74 -60 c21 -21
35 -76 29 -107 -3 -19 -93 -84 -114 -84 -18 0 -28 109 -14 145 24 64 63 82 99
46z"
                />
                <path
                  d="M2267 496 c-65 -18 -116 -61 -150 -127 -26 -48 -28 -62 -25 -130 4
-60 10 -86 32 -123 61 -104 206 -145 320 -91 62 30 120 129 87 149 -5 3 -20
-4 -35 -15 -39 -31 -91 -42 -130 -29 -31 10 -85 56 -75 63 2 2 47 28 99 57
116 65 140 85 140 120 0 37 -38 90 -80 111 -49 24 -126 31 -183 15z m86 -51
c22 -21 40 -82 33 -110 -5 -21 -92 -85 -115 -85 -21 0 -28 109 -11 157 19 50
63 68 93 38z"
                />
                <path
                  d="M2989 499 c-99 -15 -144 -54 -137 -120 2 -26 10 -37 31 -47 44 -21
82 -1 103 54 21 56 46 78 78 70 28 -7 43 -43 52 -122 l7 -53 -39 14 c-77 28
-150 11 -206 -45 -34 -34 -38 -43 -38 -89 0 -107 56 -155 181 -156 64 0 82 4
106 21 25 19 31 20 39 7 21 -33 169 -38 196 -6 10 12 8 18 -10 31 -27 21 -38
56 -46 153 -4 41 -14 98 -22 127 -34 121 -149 184 -295 161z m115 -262 c40
-40 46 -148 11 -177 -8 -6 -24 -10 -37 -8 -52 7 -80 146 -38 188 26 26 36 25
64 -3z"
                />
                <path
                  d="M1560 477 c0 -7 12 -29 26 -50 14 -21 62 -122 108 -225 l82 -187 66
-3 c44 -2 68 1 75 10 6 7 40 93 76 191 51 137 75 188 102 218 20 22 33 44 30
49 -4 6 -44 10 -91 10 -75 0 -84 -2 -84 -18 0 -11 9 -27 20 -37 11 -10 20 -26
20 -36 0 -20 -69 -220 -80 -232 -3 -4 -25 41 -47 100 -56 147 -56 148 -39 181
8 16 12 32 9 36 -4 3 -66 6 -140 6 -101 0 -133 -3 -133 -13z"
                />
              </g>
            </svg>
            <p className="description">Venue Portal</p>
            <div className="login-detail">
              <div className="login-input">
                Email:
                <input type="text" />
              </div>
              <br></br>
              <div className="login-input">
                Password:
                <input type="text" />
              </div>
              <div id="login-button">
                <Link to="/home">
                  <button className="homeButton">Log in</button>
                </Link>
              </div>
              <p>or continue with</p>
              <div className="iconrow">
                <img
                  src={require("../assets/google.png")}
                  style={{ width: "30px", height: "30px" }} alt="google"
                />
                Google
              </div>
              <div className="iconrow">
                <img
                  src={require("../assets/apple.png")}
                  style={{ width: "30px", height: "30px" }} alt="apple"
                />
                Apple
              </div>
              <h4>
                Don't have an account?
                <Link to="/signup" style={{ textDecoration: "underline", color: "#333333" }}>
                  Sign up here
                </Link>
              </h4>
            </div>
          </div>
        </div>
      </>
    );
}