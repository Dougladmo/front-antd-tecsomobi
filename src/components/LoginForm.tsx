// SignIn.tsx
import { useState, FormEvent } from "react";
import {
  Box,
  Grid,
  Button,
  Checkbox,
  CssBaseline,
  FormControlLabel,
  FormLabel,
  FormControl,
  TextField,
  Typography,
  Card,
  styled
} from "@mui/material";

const StyledCard = styled(Card)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  [theme.breakpoints.up("sm")]: {
    maxWidth: "450px"
  },
  boxShadow:
    "0px 5px 15px hsla(220, 30%, 5%, 0.05), 0px 15px 35px -5px hsla(220, 25%, 10%, 0.05)"
}));

type SignInProps = {
  onLogin: (email: string, password: string, rememberMe: boolean) => void; 
};

export default function SignIn({ onLogin }: SignInProps) {
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [remember, setRemember] = useState(false);

  const validateInputs = (): boolean => {
    const email = (document.getElementById("email") as HTMLInputElement)?.value;
    const password = (document.getElementById("password") as HTMLInputElement)
      ?.value;

    let isValid = true;

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setEmailError(true);
      setEmailErrorMessage("Por favor, insira um email válido.");
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage("");
    }

    if (!password) {
      setPasswordError(true);
      setPasswordErrorMessage("Por favor, insira a senha.");
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
    }

    return isValid;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validateInputs()) return;

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    onLogin(email, password, remember);
  };

  return (
    <>
      <CssBaseline />
      <Grid container sx={{ height: "100vh" }}>
        <div className="w-1/2 flex items-center justify-center">
          <StyledCard>
            <Typography
              variant="h4"
              sx={{
                fontSize: "clamp(2rem, 10vw, 2.15rem)",
                textAlign: "center",
                color: "#000000",
              }}
            >
              Bem-vindo Admin!
            </Typography>
            <Typography
              variant="h6"
              sx={{
                fontSize: "clamp(1.2rem, 6vw, 1.2rem)",
                textAlign: "center",
                color: "#000000",
              }}
            >
              Para continuar coloque seu usuário e senha.
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                gap: 2,
              }}
            >
              <FormControl>
                <FormLabel htmlFor="email" sx={{ color: "#1A1A1A" }}>
                  Email
                </FormLabel>
                <TextField
                  error={emailError}
                  helperText={emailErrorMessage}
                  id="email"
                  type="email"
                  name="email"
                  placeholder="seu@email.com"
                  autoComplete="email"
                  autoFocus
                  required
                  fullWidth
                  variant="outlined"
                  sx={{
                    backgroundColor: "#F0F0F0",
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: emailError ? "#FF5627" : "#84D6DA",
                      },
                      "&:hover fieldset": {
                        borderColor: "#84D6DA",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#84D6DA",
                      },
                    },
                  }}
                />
              </FormControl>

              <FormControl>
                <FormLabel htmlFor="password" sx={{ color: "#1A1A1A" }}>
                  Senha
                </FormLabel>
                <TextField
                  error={passwordError}
                  helperText={passwordErrorMessage}
                  name="password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  required
                  fullWidth
                  variant="outlined"
                  sx={{
                    backgroundColor: "#F0F0F0",
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: passwordError ? "#FF5627" : "#84D6DA",
                      },
                      "&:hover fieldset": {
                        borderColor: "#84D6DA",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#84D6DA",
                      },
                    },
                  }}
                />
              </FormControl>

              <FormControlLabel
                control={
                  <Checkbox
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    sx={{ color: "#175097" }}
                  />
                }
                label="Lembrar-me"
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  backgroundColor: "#FF5627",
                  color: "#FFFFFF",
                  "&:hover": {
                    backgroundColor: "#FF7452",
                  },
                }}
              >
                Entrar
              </Button>
            </Box>
          </StyledCard>
        </div>

        <div className="w-1/2 flex flex-col items-center justify-center from-[#175097] to-[#306EBC] bg-gradient-to-b">
            <img src="/logo2.png" alt="logo tecsomobi" className="bg-white px-4 py-2 w-1/2 rounded-3xl" />    
        </div>
      </Grid>
    </>
  );
}
