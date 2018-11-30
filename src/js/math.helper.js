class MathHelper {
    static clamp(value, min, max) {
        if (value < min) {
            return min;
        }
        else if (value > max) {
            return max;
        }

        return value;
    }

    static lerp(value1, value2, amount) {
        amount = amount < 0 ? 0 : amount;
        amount = amount > 1 ? 1 : amount;
        return value1 + (value2 - value1) * amount;
    }

    static distance(x1, y1, x2, y2) {
        let xs = x2 - x1,
            ys = y2 - y1;

        xs *= xs;
        ys *= ys;

        return Math.sqrt(xs + ys);
    }

    static random(min, max, integer = true) {
        if (integer) {
            return Math.floor(Math.random() * (max - min + 1) + min);
        } else {
            return Math.random() * (max - min) + min;
        }
    }

    static vector(p1, p2) {
        return {
            x: p2.x - p1.x,
            y: p2.y - p1.y
        }
    }

    static normalizeVector(p1, p2){
        let length = Math.sqrt(p1 * p1 + p2 * p2);
        return {
            x: p1 / length,
            y: p2 / length
        }
    }
}

export default MathHelper;