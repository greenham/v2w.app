export function About() {
  return (
    <div className="fs-3">
      <p>
        <strong>volum.io</strong> is a free volume to weight converter for the
        kitchen.
      </p>
      <p>
        It uses{" "}
        <a href="http://blog.khymos.org/wp-content/2014/01/volume-weight-conversion-v2.xlsm">
          known densities
        </a>{" "}
        of specific ingredients to calculate the weight of a given volume of
        that ingredient.
      </p>
      <p>
        Other sites/apps don't take this data into account and simply give you a
        static conversion.
      </p>
    </div>
  );
}
