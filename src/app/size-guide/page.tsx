import type { Metadata } from "next";
import { UtilityPage } from "@/components/utility-page";

export const metadata: Metadata = {
  title: "Size Guide",
  description: "Draft sizing framework for MARNI COUTURE.",
};

export default function SizeGuidePage() {
  return (
    <UtilityPage
      eyebrow="Fit information"
      title="Size guide"
      intro="The table below is a layout example only."
      notice="Replace every measurement with garment-specific, client-approved sizing. Do not publish the example values as real product measurements."
    >
      <div className="responsive-table">
        <table>
          <caption>Example sizing layout — not final</caption>
          <thead>
            <tr>
              <th>Size</th>
              <th>Bust</th>
              <th>Waist</th>
              <th>Hip</th>
            </tr>
          </thead>
          <tbody>
            {["XS", "S", "M", "L", "XL"].map((size) => (
              <tr key={size}>
                <th>{size}</th>
                <td>Confirm</td>
                <td>Confirm</td>
                <td>Confirm</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <section>
        <h2>Recommended product-level fit content</h2>
        <ul>
          <li>Garment measurements, not only body measurements</li>
          <li>Model or mannequin measurements when applicable</li>
          <li>Stretch level and intended fit</li>
          <li>Alteration, custom sizing, or made-to-order rules</li>
        </ul>
      </section>
    </UtilityPage>
  );
}
