import React from "react";
import { useRouter } from "next/router";
import { CloseIcon } from "../icons"; // Ajuste de la ruta según la estructura de tu proyecto
import { Button } from "../button"; // Ajuste de la ruta según la estructura de tu proyecto
import "./BusquedaCard.css"; // Archivo CSS para los estilos

export const BusquedaCard = ({ className, onRemove, search }) => {
  const router = useRouter();

  return (
    <div className={`busqueda-container ${className}`}>
      <div className="close-wrapper" onClick={onRemove}>
        <CloseIcon />
      </div>
      <div className="busqueda-wrapper">
        <div className="query-list">
          <div className="query-column">
            {search.opid && (
              <div className="query">
                <div className="query-prop">Tipo de Operación</div>
                <div className="query-prop capitalize">{search.opid}</div>
              </div>
            )}
            {search.prid && (
              <div className="query">
                <div className="query-prop">Tipo de Propiedad</div>
                <div className="query-prop capitalize">{search.prid}</div>
              </div>
            )}
            <div className="query">
              <div className="query-prop">Cocheras</div>
              <div className="query-prop">
                {getDropdownValue(
                  search?.parking_lot_from,
                  search?.parking_lot_to,
                  undefined,
                  true
                )}
              </div>
            </div>
            <div className="query">
              <div className="query-prop">Barrio</div>
              <div className="query-prop capitalize">
                {search.locid?.join(", ") ?? "-"}
              </div>
            </div>
          </div>
          <div className="query-column">
            <div className="query">
              <div className="query-prop">Dormitorios</div>
              <div className="query-prop">
                {getDropdownValue(
                  search?.rooms_from,
                  search?.rooms_to,
                  undefined,
                  true
                )}
              </div>
            </div>
            <div className="query">
              <div className="query-prop">Baños</div>
              <div className="query-prop">
                {getDropdownValue(
                  search?.baths_from,
                  search?.baths_to,
                  undefined,
                  true
                )}
              </div>
            </div>
            <div className="query">
              <div className="query-prop">Precio</div>
              <div className="query-prop">
                {getDropdownValue(
                  search?.price_from,
                  search?.price_to,
                  "USD",
                  true
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Button
        text="IR A LA BÚSQUEDA"
        type="black"
        className="button-busqueda"
        onClick={(e) => {
          e.preventDefault();
          router.push(search.url);
        }}
      />
    </div>
  );
};
