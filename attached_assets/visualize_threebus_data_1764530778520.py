# visualize_threebus_data.py
import os
import pandas as pd
import matplotlib.pyplot as plt

# -----------------------------
# 1️⃣ Load dataset
# -----------------------------
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.path.join(BASE_DIR, "..", "data")
csv_path = os.path.join(DATA_DIR, "threebus_data_final.csv")

if not os.path.exists(csv_path):
    raise FileNotFoundError("❌ 'threebus_data_final.csv' not found in data folder. Please run MATLAB export first!")

print(f"📥 Loading data from: {csv_path}")
df = pd.read_csv(csv_path)

# -----------------------------
# 2️⃣ Extract time and signals
# -----------------------------
time = df["Time"] if "Time" in df.columns else range(len(df))

# Voltage columns
voltage_cols = [col for col in df.columns if "V" in col]
current_cols = [col for col in df.columns if "I" in col]

# -----------------------------
# 3️⃣ Plot voltage signals (all buses)
# -----------------------------
plt.figure(figsize=(10, 6))
for col in voltage_cols:
    plt.plot(time, df[col], label=col)
plt.title("Three-Bus System: Phase Voltages (Vabc)")
plt.xlabel("Time (s)")
plt.ylabel("Voltage (p.u. or V)")
plt.legend(loc="upper right", fontsize=8)
plt.grid(True)
plt.tight_layout()
plt.show()

# -----------------------------
# 4️⃣ Plot current signals (all buses)
# -----------------------------
plt.figure(figsize=(10, 6))
for col in current_cols:
    plt.plot(time, df[col], label=col)
plt.title("Three-Bus System: Phase Currents (Iabc)")
plt.xlabel("Time (s)")
plt.ylabel("Current (A)")
plt.legend(loc="upper right", fontsize=8)
plt.grid(True)
plt.tight_layout()
plt.show()

print("✅ Visualization complete!")
