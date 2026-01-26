const LinearAlgebra = {
    /**
     * Rotate a vector by an angle in radian
     * @param vector
     * @param angle
     */
    rotateVector(vector: number[], angle: number) {
        return [
            vector[0] * Math.cos(angle) - vector[1] * Math.sin(angle),
            vector[0] * Math.sin(angle) + vector[1] * Math.cos(angle),
        ];
    },

    /**
     * Get opposite vector
     * @param vector
     */
    getOppositeVector(vector: number[]) {
        return [-1 * vector[0], -1 * vector[1]];
    },
};

export default LinearAlgebra;
