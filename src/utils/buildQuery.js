export const buildQuery = (code, type) => {
  if (type === "debugging") {
    return `
        Tolong analisis kode berikut secara mendetail untuk menemukan bug atau kesalahan sintaks. 
        Pastikan respons Anda mencakup informasi berikut:
        - Error: [Deskripsi singkat error]
        - Solution: [Solusi langkah demi langkah untuk memperbaiki error]
  
        Kode:
        \`\`\`
        ${code}
        \`\`\`
  
        Catatan Penting:
        - Jika tidak ada error, berikan konfirmasi bahwa kode sudah benar.
        - Jika ada lebih dari satu error, urutkan berdasarkan prioritas.
      `;
  }

  if (type === "feedback") {
    return `
        Berikan feedback singkat dan langsung to the point tentang kode ini. 
        Pastikan feedback mencakup hal-hal berikut:
        - Kelebihan: [Hal-hal yang baik dalam kode ini]
        - Kekurangan: [Masalah atau area yang bisa ditingkatkan]
        - Saran: [Rekomendasi konkret untuk meningkatkan kode]
  
        Kode:
        \`\`\`
        ${code}
        \`\`\`
  
        Catatan Penting:
        - Feedback harus relevan dan mudah dipahami.
        - Jika kode sudah sangat baik, berikan apresiasi.
      `;
  }

  return `
      Analisis kode ini secara umum dan beri tanggapan singkat. 
      Pastikan respons Anda mencakup penjelasan yang jelas dan berguna.
  
      Kode:
      \`\`\`
      ${code}
      \`\`\`
    `;
};
