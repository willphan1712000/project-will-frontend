/**
 * Linear Algebra library - Will Phan
 * - Vector used in this library will be 3 dimension vector = [x, y, 1] : number[]
 * - Accessing x by using vector[0]
 * - Accessing y by using vector[1]
 */
const LinearAlgebra = {
    /**
     * Translate a point by a vector
     * @param vector coordinates of a point
     * @param translateVector vector for translation
     * @throws Exception if the vector is not in 3 dimension
     */
    translateVector(vector: number[], translateVector: number[]) {
        if (vector.length !== 3) {
            throw new Error('Vector must be 3 dimension');
        }

        return [
            vector[0] + translateVector[0],
            vector[1] + translateVector[1],
            1,
        ];
    },

    /**
     * Rotate a vector by an angle in radian
     * @param vector
     * @param angle
     * @throws Exception if the vector is not in 3 dimension
     */
    rotateVector(vector: number[], angle: number) {
        if (vector.length !== 3) {
            throw new Error('Vector must be 3 dimension');
        }

        return [
            vector[0] * Math.cos(angle) - vector[1] * Math.sin(angle),
            vector[0] * Math.sin(angle) + vector[1] * Math.cos(angle),
            1,
        ];
    },

    /**
     * Get opposite vector
     * @param vector
     */
    getOppositeVector(vector: number[]) {
        return [-1 * vector[0], -1 * vector[1], 1];
    },

    /**
     * Nicolas Mattia formula
     * @param vector
     * @param translate
     * @param angle
     * @throws Exception if the vector is not in 3 dimension
     *
     * @link https://nmattia.com/posts/2020-03-03-drag-resize-rotate/
     */
    NicolasMattia(vector: number[], translate: number[], angle: number) {
        if (vector.length !== 3) {
            throw new Error('Vector must be 3 dimension');
        }

        const c = LinearAlgebra.translateVector(
            vector,
            LinearAlgebra.getOppositeVector(translate)
        );
        const r = LinearAlgebra.rotateVector(c, angle);
        return LinearAlgebra.translateVector(r, translate);
    },

    /**
     * Set coofficient for a vector
     * @param coefficient
     * @param vector
     * @throws Exception if the vector is not in 3 dimension
     */
    setCoefficient(coefficient: number, vector: number[]) {
        if (vector.length !== 3) {
            throw new Error('Vector must be 3 dimension');
        }

        return [coefficient * vector[0], coefficient * vector[1], 1];
    },

    /**
     * Plus 2 vectors
     * @param vector1
     * @param vector2
     * @throws Exception if the vector is not in 3 dimension
     */
    plusVectors(vector1: number[], vector2: number[]) {
        if (vector1.length !== 3 || vector2.length !== 3) {
            throw new Error('Vector must be 3 dimension');
        }

        return [vector1[0] + vector2[0], vector1[1] + vector2[1], 1];
    },

    /**
     * Get middle vector from 2 vectors
     * @param vector1
     * @param vector2
     * @throws Exception if the vector is not in 3 dimension
     */
    getMiddleVectorFrom(vector1: number[], vector2: number[]) {
        if (vector1.length !== 3 || vector2.length !== 3) {
            throw new Error('Vector must be 3 dimension');
        }

        return LinearAlgebra.plusVectors(
            LinearAlgebra.setCoefficient(0.5, vector1),
            LinearAlgebra.setCoefficient(0.5, vector2)
        );
    },

    /**
     * Compute dot products between two vectors
     * @param vector1
     * @param vector2
     * @throws Exception if the vector is not in 3 dimension
     */
    dotProduct(vector1: number[], vector2: number[]) {
        if (vector1.length !== 3 || vector2.length !== 3) {
            throw new Error('Vector must be 3 dimension');
        }

        return vector1[0] * vector2[0] + vector1[1] * vector2[1];
    },

    /**
     * Get vector magnitude
     * - formula : if vector = [x,y] => magnitude = square root of x^2 + y^2
     * @param vector
     * @throws Exception if the vector is not in 3 dimension
     */
    getVectorMagnitude(vector: number[]) {
        if (vector.length !== 3) {
            throw new Error('Vector must be 3 dimension');
        }

        return Math.sqrt(vector[0] * vector[0] + vector[1] * vector[1]);
    },
};

export default LinearAlgebra;
