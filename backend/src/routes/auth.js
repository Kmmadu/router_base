// Login Endpoint
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Find the ISP by email
      const isp = await ISP.findOne({ where: { email } });
      if (!isp) {
        return res.status(400).json({ message: "Invalid email or password" });
      }
  
      // Compare passwords
      const isPasswordValid = await bcrypt.compare(password, isp.password);
      if (!isPasswordValid) {
        return res.status(400).json({ message: "Invalid email or password" });
      }
  
      // Generate a JWT token
      const token = jwt.sign({ id: isp.firm_id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
  
      res.status(200).json({ message: "Login successful", token });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "An error occurred during login" });
    }
  });